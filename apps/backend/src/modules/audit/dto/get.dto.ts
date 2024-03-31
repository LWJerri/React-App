import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, Max, Min } from "class-validator";

export class GetAuditDto {
  @ApiProperty({ example: 1, description: "How many rersults to skip", minimum: 0 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  readonly offset: number;

  @ApiProperty({ example: 10, description: "How many results to return", minimum: 1, maximum: 100 })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  readonly limit: number;
}
