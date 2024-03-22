import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmptyString } from "src/validators/IsNotEmptyString";

export class CreateListDto {
  @ApiProperty({ example: "Triage", description: "Title for the list." })
  @IsNotEmptyString()
  readonly name: string;
}
