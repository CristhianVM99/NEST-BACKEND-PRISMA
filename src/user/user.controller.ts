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
import { UserService } from './user.service';
import { User } from 'prisma/generated/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Retrieves all users.
   * @returns An array of User objects.
   */
  @Get('all')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  /**
   * Retrieves a user by their unique identifier.
   * @param id - The unique identifier of the user.
   * @returns A User object if found.
   * @throws NotFoundException if the user does not exist.
   */
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = this.userService.getUserById(id);
    if (!user) throw new NotFoundException('user does not exists');
    return user;
  }

  /**
   * Creates a new user.
   * @param data - The data for creating the new user.
   * @returns The created User object.
   */
  @Post('register')
  async createUser(@Body() data: User) {
    return this.userService.createUser(data);
  }

  /**
   * Updates an existing user.
   * @param id - The unique identifier of the user to be updated.
   * @param data - The updated data for the user.
   * @returns The updated User object.
   * @throws NotFoundException if the user does not exist.
   */
  @Put('edit/:id')
  async updateUser(@Param('id') id: string, @Body() data: User) {
    try {
      return await this.userService.updateUser(id, data);
    } catch (error) {
      throw new NotFoundException('user does not exists');
    }
  }

  /**
   * Deletes a user by their unique identifier.
   * @param id - The unique identifier of the user to be deleted.
   * @returns The deleted User object.
   * @throws NotFoundException if the user does not exist.
   */
  @Delete('delete/:id')
  async deleteUser(@Param('id') id: string) {
    try {
      return this.userService.deleteUser(id);
    } catch (error) {
      throw new NotFoundException('user does not exists');
    }
  }
}
