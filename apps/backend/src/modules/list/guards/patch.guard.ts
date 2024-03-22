import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { Request } from "express";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class PatchListGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    const { body, params } = context.switchToHttp().getRequest<Request>();

    const isListExists = await this.prismaService.list.findUnique({ where: { id: params.id } });

    if (!isListExists) throw new NotFoundException("No list with this Id was found.");
    if (isListExists.name === body.name) throw new BadRequestException("New list name cannot be as the current name.");

    return true;
  }
}