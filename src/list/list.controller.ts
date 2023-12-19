import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { ListService } from './list.service';
import { List } from 'prisma/generated/client';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  /**
   * Retrieves all lists.
   * @returns An array of List objects.
   */
  @Get()
  async getAllLists() {
    return this.listService.getAllLists();
  }

  /**
   * Retrieves a list by their unique identifier.
   * @param id - The unique identifier of the list.
   * @returns A List object if found.
   * @throws NotFoundException if the list does not exist.
   */
  @Get(':id')
  async getListById(@Param('id') id: string) {
    const list = this.listService.getListById(id);
    if (!list) throw new NotFoundException('list does not exists');
    return list;
  }

  /**
   * Creates a new list.
   * @param data - The data for creating the new list.
   * @returns The created List object.
   */
  @Post()
  async createList(@Body() data: List) {
    return this.listService.createList(data);
  }

  /**
   * Updates an existing list.
   * @param id - The unique identifier of the list to be updated.
   * @param data - The updated data for the list.
   * @returns The updated List object.
   * @throws NotFoundException if the list does not exist.
   */
  @Put(':id')
  async updateList(@Param('id') id: string, @Body() data: List) {
    try {
      return await this.listService.updateList(id, data);
    } catch (error) {
      throw new NotFoundException('list does not exists');
    }
  }

  /**
   * Deletes a list by their unique identifier.
   * @param id - The unique identifier of the list to be deleted.
   * @returns The deleted List object.
   * @throws NotFoundException if the list does not exist.
   */
  @Delete(':id')
  async deleteList(@Param('id') id: string) {
    try {
      return this.listService.deleteList(id);
    } catch (error) {
      throw new NotFoundException('list does not exists');
    }
  }
}
