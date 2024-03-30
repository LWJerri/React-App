import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from "@nestjs/swagger";
import { FallbackResponse } from "src/helpers/FallbackResponse";
import { responseStatus } from "src/helpers/constants";
import { CreateListDto } from "./dto/create.dto";
import { PatchListDto } from "./dto/patch.dto";
import { ResponseListDto } from "./dto/response.dto";
import { ResponseListWithTaskFieldDto } from "./dto/responseWithTaskField.dto";
import { CreateListGuard } from "./guards/create.guard";
import { DeleteListGuard } from "./guards/delete.guard";
import { PatchListGuard } from "./guards/patch.guard";
import { ListService } from "./list.service";

@Controller("lists")
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  @ApiOperation({
    summary: "Get all lists",
    tags: ["Lists Endpoints"],
    description: "This endpoint returns a list of all created lists.",
  })
  @ApiOkResponse({ type: ResponseListWithTaskFieldDto, isArray: true, description: responseStatus["success"] })
  @ApiBadRequestResponse({ type: FallbackResponse, description: responseStatus["error"] })
  @ApiInternalServerErrorResponse({ type: FallbackResponse, description: responseStatus["error"] })
  getLists() {
    return this.listService.getLists();
  }

  @Post()
  @ApiOperation({
    summary: "Create a list",
    tags: ["Lists Endpoints"],
    description:
      "This endpoint creates a new list in the database with the specified parameters and returns an object with the new list.",
  })
  @ApiOkResponse({ type: ResponseListDto, description: responseStatus["success"] })
  @ApiBadRequestResponse({ type: FallbackResponse, description: responseStatus["error"] })
  @ApiInternalServerErrorResponse({ type: FallbackResponse, description: responseStatus["error"] })
  @ApiBody({ type: CreateListDto })
  @UseGuards(CreateListGuard)
  createList(@Body() body: CreateListDto) {
    return this.listService.createList(body);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Edit list",
    tags: ["Lists Endpoints"],
    description: "This endpoint accepts parameters to edit an existing list and returns a new list object.",
  })
  @ApiOkResponse({ type: ResponseListDto, description: responseStatus["success"] })
  @ApiBadRequestResponse({ type: FallbackResponse, description: responseStatus["error"] })
  @ApiInternalServerErrorResponse({ type: FallbackResponse, description: responseStatus["error"] })
  @ApiBody({ type: PatchListDto })
  @ApiParam({
    name: "id",
    example: "clu1pvhrh000008l09t6j7aen",
    description: "Specify the Id of the list to be edited.",
  })
  @UseGuards(PatchListGuard)
  patchList(@Body() body: PatchListDto, @Param("id") id: string) {
    return this.listService.patchList(body, id);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete list",
    tags: ["Lists Endpoints"],
    description: "This endpoint deletes the list with all tasks bound to the list.",
  })
  @ApiOkResponse({ description: responseStatus["success"] })
  @ApiBadRequestResponse({ type: FallbackResponse, description: responseStatus["error"] })
  @ApiInternalServerErrorResponse({ type: FallbackResponse, description: responseStatus["error"] })
  @ApiParam({
    name: "id",
    example: "clu1pxcl2000108l06gqlbot3",
    description: "Specify the Id of the list to be deleted.",
  })
  @UseGuards(DeleteListGuard)
  deleteList(@Param("id") id: string) {
    return this.listService.deleteList(id);
  }
}
