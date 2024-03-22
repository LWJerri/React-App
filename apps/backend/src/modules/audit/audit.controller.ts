import { Controller, Get } from "@nestjs/common";
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { NestResponse } from "src/helpers/NestResponse";
import { responses } from "src/helpers/constants";
import { AuditService } from "./audit.service";
import { AuditEntity } from "./entities/audit.entity";

@Controller("audit")
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get()
  @ApiOperation({
    summary: "Audit log",
    tags: ["Audit Log"],
    description: "This request will return the entire history of actions on lists and tasks.",
  })
  @ApiOkResponse({ type: AuditEntity, isArray: true, description: responses.success })
  @ApiBadRequestResponse({ type: NestResponse, description: responses.error })
  @ApiInternalServerErrorResponse({ type: NestResponse, description: responses.error })
  getAuditHistory() {
    return this.auditService.getAuditHistory();
  }
}
