import { Injectable } from '@nestjs/common';
import { Task } from 'prisma/generated/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}
  /**
   * Retrieves all tasks from the database.
   * @returns A promise that resolves to an array of Task objects.
   */
  getAllTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  /**
   * Retrieves a task by their unique identifier.
   * @param id - The unique identifier of the task.
   * @returns A promise that resolves to a Task object if found.
   */
  getTaskById(id: string): Promise<Task> {
    return this.prisma.task.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * Creates a new task in the database.
   * @param data - The data for creating the new task.
   * @returns A promise that resolves to the created Task object.
   */
  createTask(data: Task): Promise<Task> {
    return this.prisma.task.create({
      data,
    });
  }

  /**
   * Updates an existing task in the database.
   * @param id - The unique identifier of the task to be updated.
   * @param data - The updated data for the task.
   * @returns A promise that resolves to the updated Task object.
   */
  updateTask(id: string, data: Task): Promise<Task> {
    return this.prisma.task.update({
      where: {
        id,
      },
      data,
    });
  }

  /**
   * Deletes a task from the database by their unique identifier.
   * @param id - The unique identifier of the task to be deleted.
   * @returns A promise that resolves to the deleted Task object.
   */
  deleteTask(id: string): Promise<Task> {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
