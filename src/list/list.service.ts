import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { List } from 'prisma/generated/client';

@Injectable()
export class ListService {
  constructor(private prisma: PrismaService) {}

  /**
   * Retrieves all lists from the database.
   * @returns A promise that resolves to an array of List objects.
   */
  getAllLists(): Promise<List[]> {
    return this.prisma.list.findMany();
  }

  /**
   * Retrieves a list by their unique identifier.
   * @param id - The unique identifier of the list.
   * @returns A promise that resolves to a List object if found.
   */
  getListById(id: string): Promise<List> {
    return this.prisma.list.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * Creates a new list in the database.
   * @param data - The data for creating the new list.
   * @returns A promise that resolves to the created List object.
   */
  createList(data: List): Promise<List> {
    return this.prisma.list.create({
      data,
    });
  }

  /**
   * Updates an existing list in the database.
   * @param id - The unique identifier of the list to be updated.
   * @param data - The updated data for the list.
   * @returns A promise that resolves to the updated List object.
   */
  updateList(id: string, data: List): Promise<List> {
    return this.prisma.list.update({
      where: {
        id,
      },
      data,
    });
  }

  /**
   * Deletes a list from the database by their unique identifier.
   * @param id - The unique identifier of the list to be deleted.
   * @returns A promise that resolves to the deleted List object.
   */
  deleteList(id: string): Promise<List> {
    return this.prisma.list.delete({
      where: {
        id,
      },
    });
  }
}
