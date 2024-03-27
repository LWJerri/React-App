import { Injectable } from "@nestjs/common";
import { Action, Task } from "@prisma/client";
import { updatedDiff } from "deep-object-diff";
import { PrismaService } from "../prisma/prisma.service";
import { CreateTaskDto } from "./dto/create.dto";
import { PatchTaskDto } from "./dto/patch.dto";

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTasks(listId: string) {
    const tasks = await this.prismaService.task.findMany({ where: { listId }, orderBy: { createdAt: "desc" } });

    return tasks;
  }

  async getAudit(id: string) {
    const audit = await this.prismaService.auditLog.findMany({
      where: { relatedId: id },
      orderBy: { createdAt: "desc" },
    });

    return audit;
  }

  async getTask(id: string) {
    const task = await this.prismaService.task.findUnique({ where: { id } });

    return task;
  }

  async createTask(body: CreateTaskDto, listId: string) {
    const task = await this.prismaService.task.create({ data: { ...body, listId } });

    await this.prismaService.auditLog.create({
      data: { action: "CREATE", affectedField: "name", relatedId: task.id, newState: task.name },
    });

    return task;
  }

  async patchTask(body: PatchTaskDto, id: string) {
    const prepOldTask = await this.prismaService.task.findUnique({ where: { id } });
    const oldTask = prepOldTask!;

    const task = await this.prismaService.task.update({
      where: { id },
      data: { ...body, updatedAt: new Date() },
    });

    const filterKey: keyof Task = "updatedAt";

    const prepNewChanges = updatedDiff(oldTask, task);
    const newChanges = Object.keys(prepNewChanges).filter((key) => key !== filterKey);

    const auditLogData = Object.keys(newChanges).map((key) => {
      const affectedField = key as keyof Task;
      const newState = String(task[affectedField]);
      const oldState = String(oldTask[affectedField]);

      return { action: Action.EDIT, affectedField, relatedId: task.id, newState, oldState };
    });

    await this.prismaService.auditLog.createMany({ data: auditLogData });

    return task;
  }

  async deleteTask(id: string) {
    const task = await this.prismaService.task.delete({ where: { id } });

    await this.prismaService.auditLog.create({
      data: { action: "DELETE", affectedField: "name", relatedId: task.id, oldState: task.name },
    });
  }
}
