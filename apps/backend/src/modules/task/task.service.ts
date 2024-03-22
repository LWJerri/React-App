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

  async getHistory(id: string) {
    const taskHistory = await this.prismaService.auditLog.findMany({
      where: { relatedId: id },
      orderBy: { createdAt: "desc" },
    });

    return taskHistory;
  }

  async getTask(id: string) {
    const task = await this.prismaService.task.findUnique({ where: { id } });

    return task;
  }

  async createTask(body: CreateTaskDto, listId: string) {
    const task = await this.prismaService.task.create({
      data: { ...body, listId },
    });

    await this.prismaService.auditLog.create({
      data: { action: "CREATE", affectedField: "name", relatedId: task.id, newState: task.name },
    });

    return task;
  }

  async patchTask(body: PatchTaskDto, id: string) {
    const { newListId, ...fields } = body;

    const prepOldTask = await this.prismaService.task.findUnique({ where: { id } });
    const oldTask = prepOldTask!;

    const task = await this.prismaService.task.update({ where: { id }, data: { listId: newListId, ...fields } });

    const newChanges = updatedDiff(oldTask, task);

    const auditLogData = Object.keys(newChanges).map((key) => {
      const affectedField = key as keyof Task;

      return {
        action: Action.EDIT,
        affectedField,
        relatedId: task.id,
        newState: String(task[affectedField]),
        oldState: String(oldTask[affectedField]),
      };
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
