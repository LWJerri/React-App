import { Injectable } from "@nestjs/common";
import { ResponseListDto } from "../list/dto/response.dto";
import { PrismaService } from "../prisma/prisma.service";
import { ResponseTaskDto } from "../task/dto/response.dto";
import { GetAuditDto } from "./dto/get.dto";
import { ResponseAuditDto } from "./dto/response.dto";

@Injectable()
export class AuditService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAudit(query: GetAuditDto): Promise<ResponseAuditDto[]> {
    const retrieveAuditLog = await this.prismaService.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        action: true,
        relatedModel: true,
        affectedField: true,
        createdAt: true,
        newState: true,
        oldState: true,
      },
      skip: query.offset,
      take: query.limit,
    });

    const response: ResponseAuditDto[] = retrieveAuditLog.map((log) => ({
      oldState: log.oldState as unknown as ResponseListDto | ResponseTaskDto,
      newState: log.newState as unknown as ResponseListDto | ResponseTaskDto,
      action: log.action,
      affectedField: log.affectedField,
      createdAt: log.createdAt,
      relatedModel: log.relatedModel,
    }));

    return response;
  }
}
