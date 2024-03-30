import { ApiProperty } from "@nestjs/swagger";

export class ResponseListDto {
  @ApiProperty({ example: "clu1pl3ku000508jxh4p5hqrw", description: "Unique Id of the record in the database" })
  readonly id: string;

  @ApiProperty({ example: "Triage", description: "Title for the list.", minLength: 3, maxLength: 20 })
  readonly name: string;

  @ApiProperty({ example: new Date().toISOString(), description: "Date the list was created." })
  readonly createdAt: Date;

  @ApiProperty({ example: new Date().toISOString(), description: "Date the list was updated." })
  readonly updatedAt: Date;
}
