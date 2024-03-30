import { Module } from "@nestjs/common";
import { PriorityController } from "./priority.controller";
import { PriorityService } from "./priority.service";

@Module({
  controllers: [PriorityController],
  providers: [PriorityService],
})
export class PriorityModule {}
