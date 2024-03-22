import { CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { Request } from "express";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class TaskGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    const { params } = context.switchToHttp().getRequest<Request>();

    const isListExists = await this.prismaService.list.findUnique({ where: { id: params.listId } });

    if (!isListExists) throw new NotFoundException("No list with this Id was found.");

    return true;
  }
}
