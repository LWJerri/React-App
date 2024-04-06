import { Injectable } from "@nestjs/common";
import { Prisma, Task } from "@prisma/client";
import { updatedDiff } from "deep-object-diff";
import { ResponseAuditTaskDto } from "../audit/dto/response.dto";
import { PrismaService } from "../prisma/prisma.service";
import { CreateTaskDto } from "./dto/create.dto";
import { PatchTaskDto } from "./dto/patch.dto";
import { ResponseTaskDto } from "./dto/response.dto";

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTasks(listId: string): Promise<ResponseTaskDto[]> {
    const tasks = await this.prismaService.task.findMany({
      where: { listId },
      orderBy: { createdAt: "desc" },
      take: 5000,
    });

    return tasks;
  }

  async getAudit(id: string): Promise<ResponseAuditTaskDto[]> {
    const retrieveAuditLog = await this.prismaService.auditLog.findMany({
      where: { relatedId: id, relatedModel: "TASK" },
      orderBy: { createdAt: "desc" },
      select: {
        action: true,
        relatedModel: true,
        affectedField: true,
        createdAt: true,
        newState: true,
        oldState: true,
      },
      take: 5000,
    });

    const response: ResponseAuditTaskDto[] = retrieveAuditLog.map((log) => ({
      oldState: log.oldState as unknown as ResponseTaskDto,
      newState: log.newState as unknown as ResponseTaskDto,
      action: log.action,
      affectedField: log.affectedField,
      createdAt: log.createdAt,
      relatedModel: log.relatedModel,
    }));

    return response;
  }

  async getTask(id: string): Promise<ResponseTaskDto> {
    const task = await this.prismaService.task.findUnique({ where: { id } });

    return task!;
  }

  async createTask(body: CreateTaskDto, listId: string): Promise<ResponseTaskDto> {
    const task = await this.prismaService.task.create({ data: { ...body, listId } });

    await this.prismaService.auditLog.create({
      data: { action: "CREATE", affectedField: "name", relatedId: task.id, relatedModel: "TASK", newState: task },
    });

    return task;
  }

  async patchTask(body: PatchTaskDto, id: string): Promise<ResponseTaskDto> {
    const prepOldState = await this.prismaService.task.findUnique({ where: { id } });
    const oldState = prepOldState!;

    const task = await this.prismaService.task.update({ where: { id }, data: { ...body, updatedAt: new Date() } });

    const updatedAtKey: keyof Task = "updatedAt";

    const prepNewChanges = updatedDiff(oldState, task);
    const newChanges = Object.keys(prepNewChanges).filter((key) => key !== updatedAtKey);

    const auditLogData: Prisma.AuditLogCreateManyInput[] = newChanges.map((key) => ({
      action: "EDIT",
      affectedField: key,
      relatedId: task.id,
      relatedModel: "TASK",
      newState: task,
      oldState,
    }));

    await this.prismaService.auditLog.createMany({ data: auditLogData });

    return task;
  }

  async deleteTask(id: string) {
    const task = await this.prismaService.task.delete({ where: { id } });

    await this.prismaService.auditLog.create({
      data: { action: "DELETE", affectedField: "name", relatedId: task.id, relatedModel: "TASK", oldState: task },
    });
  }
}
