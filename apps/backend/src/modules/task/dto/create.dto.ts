import { ApiProperty } from "@nestjs/swagger";
import { Priority } from "@prisma/client";
import { IsDateString, IsEnum } from "class-validator";
import { IsNotEmptyString } from "src/validators/IsNotEmptyString";

export class CreateTaskDto {
  @ApiProperty({ example: "My awesome task 💖", description: "Title for the task." })
  @IsNotEmptyString()
  readonly name: string;

  @ApiProperty({
    example: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    description: "Detailed description for the task.",
  })
  @IsNotEmptyString()
  readonly description: string;

  @ApiProperty({ example: new Date().toISOString(), description: "The time by which the task must be completed." })
  @IsDateString()
  readonly dueAt: string;

  @ApiProperty({ example: Priority.NORMAL, enum: Priority, description: "Prioritization of task performance." })
  @IsEnum(Priority)
  readonly priority: Priority;
}
