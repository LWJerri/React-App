import { Controller, Get, Query } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from "@nestjs/swagger";
import { FallbackResponse } from "src/helpers/FallbackResponse";
import { responseStatus } from "src/helpers/constants";
import { AuditService } from "./audit.service";
import { GetAuditDto } from "./dto/get.dto";
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
  @ApiQuery({
    name: "offset",
    type: Number,
    required: true,
    example: 1,
    description: "How many records need to skip.",
  })
  @ApiQuery({
    name: "limit",
    type: Number,
    required: true,
    example: 50,
    description: "How many records to return.",
  })
  getAudit(@Query() query: GetAuditDto) {
    return this.auditService.getAudit(query);
  }
}
