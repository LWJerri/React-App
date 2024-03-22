import { Injectable } from "@nestjs/common";
import { Action, List } from "@prisma/client";
import { updatedDiff } from "deep-object-diff";
import { PrismaService } from "../prisma/prisma.service";
import { CreateListDto } from "./dto/create.dto";
import { PatchListDto } from "./dto/patch";

@Injectable()
export class ListService {
  constructor(private readonly prismaService: PrismaService) {}

  async getLists() {
    const retrieveLists = await this.prismaService.list.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: true },
    });

    const lists = retrieveLists.map((list) => {
      const { _count, ...fields } = list;

      return { ...fields, ..._count };
    });

    return lists;
  }

  async createList(body: CreateListDto) {
    const list = await this.prismaService.list.create({ data: { ...body } });

    await this.prismaService.auditLog.create({
      data: { action: "CREATE", affectedField: "name", relatedId: list.id, newState: list.name },
    });

    return list;
  }

  async patchList(body: PatchListDto, id: string) {
    const prepOldList = await this.prismaService.list.findUnique({ where: { id } });
    const oldList = prepOldList!;

    const list = await this.prismaService.list.update({ where: { id }, data: { ...body } });

    const newChanges = updatedDiff(oldList, list);

    const auditLogData = Object.keys(newChanges).map((key) => {
      const affectedField = key as keyof List;

      return {
        action: Action.EDIT,
        affectedField,
        relatedId: list.id,
        newState: String(list[affectedField]),
        oldState: String(oldList[affectedField]),
      };
    });

    await this.prismaService.auditLog.createMany({ data: auditLogData });

    return list;
  }

  async deleteList(id: string) {
    const list = await this.prismaService.list.delete({ where: { id } });

    await this.prismaService.auditLog.create({
      data: { action: "DELETE", affectedField: "name", relatedId: list.id, oldState: list.name },
    });
  }
}
