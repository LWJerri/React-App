import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class NestResponse {
  @ApiProperty({ example: 404, description: "Error in numeric format." })
  statusCode: number;

  @ApiProperty({
    example: "Cannot GET /",
    description: "Detailed description of the error. This field can be as <b>string</b> or <b>array of strings</b>.",
  })
  message: string | string[];

  @ApiPropertyOptional({ example: "Not Found", description: "Brief description of the error." })
  error?: string;
}
