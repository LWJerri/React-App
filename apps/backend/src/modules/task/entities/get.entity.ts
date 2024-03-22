import { ApiProperty } from "@nestjs/swagger";
import { Priority, Task } from "@prisma/client";

export class GetEntity implements Task {
  @ApiProperty({ example: "clu1q2t4h000308l02jl2d8ze ", description: "Unique Id of the record in the database" })
  id: string;

  @ApiProperty({ example: "My awesome task", description: "Title for the task." })
  name: string;

  @ApiProperty({
    example: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    description: "Detailed description for the task.",
  })
  description: string;

  @ApiProperty({ example: new Date().toISOString(), description: "The time by which the task must be completed." })
  dueAt: Date;

  @ApiProperty({ example: Priority.NORMAL, enum: Priority, description: "Prioritization of task performance." })
  priority: Priority;

  @ApiProperty({ example: new Date().toISOString(), description: "Date the task was created." })
  createdAt: Date;

  @ApiProperty({ example: new Date().toISOString(), description: "Date the task was updated." })
  updatedAt: Date;

  @ApiProperty({
    example: "clu1q5lg9000408l010be3hld ",
    description: "The unique Id of the list to which the task is bound.",
  })
  listId: string;
}
