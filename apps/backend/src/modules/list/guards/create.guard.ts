import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class CreateListGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    const { body } = context.switchToHttp().getRequest<Request>();

    const isListAlreadyCreated = await this.prismaService.list.findFirst({
      where: { name: { mode: "insensitive", equals: String(body.name) } },
      select: { id: true },
    });

    if (isListAlreadyCreated) throw new BadRequestException("A list by that name already exists.");

    return true;
  }
}
