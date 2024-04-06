import { Injectable } from "@nestjs/common";
import { List, Prisma } from "@prisma/client";
import { updatedDiff } from "deep-object-diff";
import { PrismaService } from "../prisma/prisma.service";
import { CreateListDto } from "./dto/create.dto";
import { PatchListDto } from "./dto/patch.dto";
import { ResponseListDto } from "./dto/response.dto";
import { ResponseListWithTaskFieldDto } from "./dto/responseWithTaskField.dto";

@Injectable()
export class ListService {
  constructor(private readonly prismaService: PrismaService) {}

  async getLists(): Promise<ResponseListWithTaskFieldDto[]> {
    const retrieveLists = await this.prismaService.list.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: true },
      take: 100,
    });

    const lists = retrieveLists.map((list) => {
      const { _count, ...fields } = list;

      return { ...fields, ..._count };
    });

    return lists;
  }

  async createList(body: CreateListDto): Promise<Omit<ResponseListDto, "task">> {
    const list = await this.prismaService.list.create({ data: { ...body } });

    await this.prismaService.auditLog.create({
      data: { action: "CREATE", affectedField: "name", relatedId: list.id, relatedModel: "LIST", newState: list },
    });

    return list;
  }

  async patchList(body: PatchListDto, id: string): Promise<ResponseListDto> {
    const prepOldState = await this.prismaService.list.findUnique({ where: { id } });
    const oldState = prepOldState!;

    const prepList = await this.prismaService.list.update({
      where: { id },
      data: { ...body, updatedAt: new Date() },
      include: { _count: true },
    });
    const { _count, ...fields } = prepList;

    const updatedAtKey: keyof List = "updatedAt";

    const prepNewChanges = updatedDiff(oldState, prepList);
    const newChanges = Object.keys(prepNewChanges).filter((key) => key !== updatedAtKey);

    const auditLogData: Prisma.AuditLogCreateManyInput[] = newChanges.map((key) => ({
      action: "EDIT",
      affectedField: key,
      relatedId: prepList.id,
      relatedModel: "LIST",
      newState: prepList,
      oldState,
    }));

    await this.prismaService.auditLog.createMany({ data: auditLogData });

    return { ...fields, ..._count };
  }

  async deleteList(id: string) {
    const list = await this.prismaService.list.delete({ where: { id } });

    await this.prismaService.auditLog.create({
      data: { action: "DELETE", affectedField: "name", relatedId: list.id, relatedModel: "LIST", oldState: list },
    });
  }
}
