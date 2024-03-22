import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuditService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAuditHistory() {
    const retrieveAuditLog = await this.prismaService.auditLog.findMany({ orderBy: { createdAt: "desc" } });

    return retrieveAuditLog;
  }
}
