import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'prisma/generated/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /**
   * Retrieves all users from the database.
   * @returns A promise that resolves to an array of User objects.
   */
  getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  /**
   * Retrieves a user by their unique identifier.
   * @param id - The unique identifier of the user.
   * @returns A promise that resolves to a User object if found.
   */
  getUserById(id: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * Creates a new user in the database.
   * @param data - The data for creating the new user.
   * @returns A promise that resolves to the created User object.
   */
  createUser(data: User): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  /**
   * Updates an existing user in the database.
   * @param id - The unique identifier of the user to be updated.
   * @param data - The updated data for the user.
   * @returns A promise that resolves to the updated User object.
   */
  updateUser(id: string, data: User): Promise<User> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  /**
   * Deletes a user from the database by their unique identifier.
   * @param id - The unique identifier of the user to be deleted.
   * @returns A promise that resolves to the deleted User object.
   */
  deleteUser(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
