import { Controller, Get } from "@nestjs/common";
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { FallbackResponse } from "src/helpers/FallbackResponse";
import { responseStatus } from "src/helpers/constants";
import { AuditService } from "./audit.service";
import { ResponseAuditDto } from "./dto/response.dto";

@Controller("audit")
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get()
  @ApiOperation({
    summary: "Global audit log",
    description: "This request will return the entire history of actions on lists and tasks.",
  })
  @ApiOkResponse({ type: ResponseAuditDto, isArray: true, description: responseStatus["success"] })
  @ApiBadRequestResponse({ type: FallbackResponse, description: responseStatus["error"] })
  @ApiInternalServerErrorResponse({ type: FallbackResponse, description: responseStatus["error"] })
  getAudit() {
    return this.auditService.getAudit();
  }
}
