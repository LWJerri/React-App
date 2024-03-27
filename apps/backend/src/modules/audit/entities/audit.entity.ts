import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Action, AuditLog } from "@prisma/client";

export class AuditEntity implements AuditLog {
  @ApiProperty({ example: "clu1pdblv000308jxg7xj2bhy", description: "Unique Id of the record in the database." })
  readonly id: string;

  @ApiProperty({ example: Action.CREATE, enum: Action, description: "What kind of action took place." })
  readonly action: Action;

  @ApiProperty({ example: "clu1pe5sc000408jx2fgfdkc8", description: "The unique Id with which the action occurred." })
  readonly relatedId: string;

  @ApiProperty({ examples: ["name", "description"], description: "What exactly was changed in the record." })
  readonly affectedField: string;

  @ApiPropertyOptional({ example: "Old Name", description: "The value before the action is performed." })
  readonly oldState: string | null;

  @ApiPropertyOptional({ example: "New Name", description: "Value when the action has already been performed." })
  readonly newState: string | null;

  @ApiProperty({ example: new Date().toISOString(), description: "The date on which the action was performed." })
  readonly createdAt: Date;

  @ApiProperty({ example: new Date().toISOString(), description: "The date on which the action was performed." })
  readonly updatedAt: Date;
}
