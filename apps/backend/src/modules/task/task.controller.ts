import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from "@nestjs/swagger";
import { NestResponse } from "src/helpers/NestResponse";
import { responses } from "src/helpers/constants";
import { AuditEntity } from "../audit/entities/audit.entity";
import { CreateTaskDto } from "./dto/create.dto";
import { PatchTaskDto } from "./dto/patch.dto";
import { GetEntity } from "./entities/get.entity";
import { GetTaskGuard } from "./guards/get.guard";
import { PatchTaskGuard } from "./guards/patch.guard";
import { TaskGuard } from "./guards/task.guard";
import { TaskService } from "./task.service";

@Controller("lists/:listId/tasks")
@UseGuards(TaskGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @ApiOperation({
    summary: "Get the tasks",
    tags: ["Tasks Endpoints"],
    description: "This endpoint will return a list of all created tasks for the specified list.",
  })
  @ApiOkResponse({ type: GetEntity, isArray: true, description: responses.success })
  @ApiBadRequestResponse({ type: NestResponse, description: responses.error })
  @ApiInternalServerErrorResponse({ type: NestResponse, description: responses.error })
  @ApiParam({
    name: "listId",
    example: "clu1q9zal000508l0cmq7b24e ",
    description: "Specify the Id of the list for which you want to retrieve tasks.",
  })
  getTasks(@Param("listId") listId: string) {
    return this.taskService.getTasks(listId);
  }

  @Get(":id/audit")
  @ApiOperation({
    summary: "History of changes",
    tags: ["Tasks Endpoints"],
    description: "This endpoint will return a list of all changes that are associated with the specified task.",
  })
  @ApiOkResponse({ type: AuditEntity, isArray: true, description: responses.success })
  @ApiBadRequestResponse({ type: NestResponse, description: responses.error })
  @ApiInternalServerErrorResponse({ type: NestResponse, description: responses.error })
  @ApiParam({
    name: "id",
    example: "clu1qbwq6000608l016lme5b0 ",
    description: "Specify the Id of the task for which you want to retrieve the history.",
  })
  @UseGuards(GetTaskGuard)
  getAudit(@Param("id") id: string) {
    return this.taskService.getAudit(id);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get the task",
    tags: ["Tasks Endpoints"],
    description: "This endpoint will return an object with detailed information about a specific task.",
  })
  @ApiOkResponse({ type: GetEntity, description: responses.success })
  @ApiBadRequestResponse({ type: NestResponse, description: responses.error })
  @ApiInternalServerErrorResponse({ type: NestResponse, description: responses.error })
  @ApiParam({
    name: "id",
    example: "clu1qdgea000708l097xq1jb9 ",
    description: "Specify the Id of the task for which you want to retrieve the history.",
  })
  @UseGuards(GetTaskGuard)
  getTask(@Param("id") id: string) {
    return this.taskService.getTask(id);
  }

  @Post()
  @ApiOperation({
    summary: "Create a task",
    tags: ["Tasks Endpoints"],
    description: "This endpoint accepts parameters to create a task and returns an object with the created task.",
  })
  @ApiOkResponse({ type: GetEntity, description: responses.success })
  @ApiBadRequestResponse({ type: NestResponse, description: responses.error })
  @ApiInternalServerErrorResponse({ type: NestResponse, description: responses.error })
  @ApiBody({ type: CreateTaskDto })
  @ApiParam({
    name: "listId",
    example: "clu1qf8l4000808l037zq5ohy ",
    description: "Specify the Id of the list to which the task will be attached.",
  })
  createTask(@Param("listId") listId: string, @Body() body: CreateTaskDto) {
    return this.taskService.createTask(body, listId);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Edit task",
    tags: ["Tasks Endpoints"],
    description: "This endpoint accepts parameters to edit an existing task and returns a new object.",
  })
  @ApiOkResponse({ type: GetEntity, description: responses.success })
  @ApiBadRequestResponse({ type: NestResponse, description: responses.error })
  @ApiInternalServerErrorResponse({ type: NestResponse, description: responses.error })
  @ApiBody({ type: PatchTaskDto })
  @ApiParam({
    name: "id",
    example: "clu1qhhuj000908l0bt4j5u3l ",
    description: "Specify the Id of the task for which you want to modify.",
  })
  @UseGuards(PatchTaskGuard)
  patchTask(@Body() body: PatchTaskDto, @Param("id") id: string) {
    return this.taskService.patchTask(body, id);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete task",
    tags: ["Tasks Endpoints"],
    description: "This endpoint removes the task from the database.",
  })
  @ApiOkResponse({ description: responses.success })
  @ApiBadRequestResponse({ type: NestResponse, description: responses.error })
  @ApiInternalServerErrorResponse({ type: NestResponse, description: responses.error })
  @ApiParam({
    name: "id",
    example: "clu1qiv97000a08l0e1185dzw ",
    description: "Specify the Id of the task to be deleted.",
  })
  @UseGuards(GetTaskGuard)
  deleteTask(@Param("id") id: string) {
    return this.taskService.deleteTask(id);
  }
}
