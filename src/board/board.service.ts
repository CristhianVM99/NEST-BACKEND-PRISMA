import { Injectable } from '@nestjs/common';
import { Board } from 'prisma/generated/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BoardService {
  constructor(private prisma: PrismaService) {}

  /**
   * Retrieves all boards from the database.
   * @returns A promise that resolves to an array of Board objects.
   */
  getAllBoards(): Promise<Board[]> {
    return this.prisma.board.findMany();
  }

  /**
   * Retrieves a board by their unique identifier.
   * @param id - The unique identifier of the board.
   * @returns A promise that resolves to a Board object if found.
   */
  getBoardById(id: string): Promise<Board> {
    return this.prisma.board.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * Creates a new board in the database.
   * @param data - The data for creating the new board.
   * @returns A promise that resolves to the created Board object.
   */
  createBoard(data: Board): Promise<Board> {
    return this.prisma.board.create({
      data,
    });
  }

  /**
   * Updates an existing user in the database.
   * @param id - The unique identifier of the board to be updated.
   * @param data - The updated data for the board.
   * @returns A promise that resolves to the updated Board object.
   */
  updateBoard(id: string, data: Board): Promise<Board> {
    return this.prisma.board.update({
      where: {
        id,
      },
      data,
    });
  }

  /**
   * Deletes a board from the database by their unique identifier.
   * @param id - The unique identifier of the board to be deleted.
   * @returns A promise that resolves to the deleted Board object.
   */
  deleteBoard(id: string): Promise<Board> {
    return this.prisma.board.delete({
      where: {
        id,
      },
    });
  }
}
