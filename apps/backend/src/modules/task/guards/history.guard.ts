import { CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { Request } from "express";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class HistoryTaskGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    const { params } = context.switchToHttp().getRequest<Request>();

    const { listId, id } = params;

    const isTaskExists = await this.prismaService.task.findUnique({ where: { id, listId } });

    if (!isTaskExists) throw new NotFoundException("No task with this Id was found.");

    return true;
  }
}
