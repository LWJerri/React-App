import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuditController } from "./audit.controller";
import { AuditService } from "./audit.service";

@Module({
  controllers: [AuditController],
  providers: [AuditService, PrismaService],
})
export class AuditModule {}
