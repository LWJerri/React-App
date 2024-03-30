import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { LoggerModule } from "nestjs-pino";
import { AuditModule } from "../audit/audit.module";
import { ListModule } from "../list/list.module";
import { PriorityModule } from "../priority/priority.module";
import { TaskModule } from "../task/task.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot(),
    ListModule,
    TaskModule,
    AuditModule,
    PriorityModule,
  ],
})
export class AppModule {}
