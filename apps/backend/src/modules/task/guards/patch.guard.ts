import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { Request } from "express";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class PatchTaskGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    const { body, params } = context.switchToHttp().getRequest<Request>();

    if (body?.listId && body?.listId !== "") {
      const isListExists = await this.prismaService.list.findUnique({
        where: { id: String(body.listId) },
        select: { id: true },
      });

      if (!isListExists) throw new NotFoundException("No new list with this Id was found.");
    } else {
      throw new BadRequestException("listId field must be filled if exists.");
    }

    const isTaskExists = await this.prismaService.task.findUnique({ where: { id: params.id }, select: { id: true } });

    if (!isTaskExists) throw new NotFoundException("No task with this Id was found.");

    return true;
  }
}
