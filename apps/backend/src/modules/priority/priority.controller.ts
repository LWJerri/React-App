import { Controller, Get } from "@nestjs/common";
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { Priority } from "@prisma/client";
import { FallbackResponse } from "src/helpers/FallbackResponse";
import { responseStatus } from "src/helpers/constants";
import { PriorityService } from "./priority.service";

@Controller("priority")
export class PriorityController {
  constructor(private readonly priorityService: PriorityService) {}

  @Get()
  @ApiOperation({
    summary: "Get priorities",
    description: "This endpoint accepts parameters to edit an existing list and returns a new list object.",
  })
  @ApiOkResponse({
    schema: { type: "object", enum: [Priority], description: "Returns an array of all available priorities." },
    description: responseStatus["success"],
  })
  @ApiBadRequestResponse({ type: FallbackResponse, description: responseStatus["error"] })
  @ApiInternalServerErrorResponse({ type: FallbackResponse, description: responseStatus["error"] })
  getPriorities() {
    return this.priorityService.getPriorities();
  }
}
