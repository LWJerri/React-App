import { ApiProperty } from "@nestjs/swagger";
import { List } from "@prisma/client";

export class GetEntity implements List {
  @ApiProperty({ example: "clu1pl3ku000508jxh4p5hqrw", description: "Unique Id of the record in the database" })
  id: string;

  @ApiProperty({ example: "Triage", description: "Title for the list." })
  name: string;

  @ApiProperty({ example: new Date().toISOString(), description: "Date the list was created." })
  createdAt: Date;

  @ApiProperty({ example: new Date().toISOString(), description: "Date the list was updated." })
  updatedAt: Date;

  @ApiProperty({ example: 1, description: "How many tasks does this list have." })
  task: number;
}
