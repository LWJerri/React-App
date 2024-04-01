import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { CreateTaskDto } from "./create.dto";

export class PatchTaskDto extends PartialType(CreateTaskDto) {
  @ApiPropertyOptional({
    example: "clu1q1fu9000208l02homh3in",
    description: "The new Id of the list where the task will be moved to.",
  })
  @IsOptional()
  @IsString()
  readonly listId: string;
}
