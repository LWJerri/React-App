import { CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { Request } from "express";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class PatchTaskGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    const { body, params } = context.switchToHttp().getRequest<Request>();

    if (body.newListId) {
      const isListExists = await this.prismaService.list.findUnique({ where: { id: body.newListId } });

      if (!isListExists) throw new NotFoundException("No list with this Id was found.");
    }

    const isTaskExists = await this.prismaService.task.findUnique({ where: { id: params.id } });

    if (!isTaskExists) throw new NotFoundException("No task with this Id was found.");

    return true;
  }
}
