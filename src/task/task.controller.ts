import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from 'prisma/generated/client';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  /**
   * Retrieves all tasks.
   * @returns An array of Task objects.
   */
  @Get()
  async getAllTasks() {
    return this.taskService.getAllTasks();
  }

  /**
   * Retrieves a task by their unique identifier.
   * @param id - The unique identifier of the task.
   * @returns A Task object if found.
   * @throws NotFoundException if the task does not exist.
   */
  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    const task = this.taskService.getTaskById(id);
    if (!task) throw new NotFoundException('task does not exists');
    return task;
  }

  /**
   * Creates a new task.
   * @param data - The data for creating the new task.
   * @returns The created Task object.
   */
  @Post()
  async createTask(@Body() data: Task) {
    return this.taskService.createTask(data);
  }

  /**
   * Updates an existing task.
   * @param id - The unique identifier of the task to be updated.
   * @param data - The updated data for the task.
   * @returns The updated Task object.
   * @throws NotFoundException if the task does not exist.
   */
  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() data: Task) {
    try {
      return await this.taskService.updateTask(id, data);
    } catch (error) {
      throw new NotFoundException('task does not exists');
    }
  }

  /**
   * Deletes a task by their unique identifier.
   * @param id - The unique identifier of the task to be deleted.
   * @returns The deleted Task object.
   * @throws NotFoundException if the task does not exist.
   */
  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    try {
      return this.taskService.deleteTask(id);
    } catch (error) {
      throw new NotFoundException('task does not exists');
    }
  }
}
