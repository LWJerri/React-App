import { ApiProperty } from "@nestjs/swagger";
import { List } from "@prisma/client";

export class GetEntity implements List {
  @ApiProperty({ example: "clu1pl3ku000508jxh4p5hqrw", description: "Unique Id of the record in the database" })
  readonly id: string;

  @ApiProperty({ example: "Triage", description: "Title for the list." })
  readonly name: string;

  @ApiProperty({ example: new Date().toISOString(), description: "Date the list was created." })
  readonly createdAt: Date;

  @ApiProperty({ example: new Date().toISOString(), description: "Date the list was updated." })
  readonly updatedAt: Date;

  @ApiProperty({ example: 1, description: "How many tasks does this list have." })
  readonly task: number;
}
