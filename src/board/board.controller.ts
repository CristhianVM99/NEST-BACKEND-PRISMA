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
import { BoardService } from './board.service';
import { Board } from 'prisma/generated/client';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  /**
   * Retrieves all boards.
   * @returns An array of board objects.
   */
  @Get('all')
  async getAllBoard() {
    return this.boardService.getAllBoards();
  }

  /**
   * Retrieves a board by their unique identifier.
   * @param id - The unique identifier of the board.
   * @returns A board object if found.
   * @throws NotFoundException if the board does not exist.
   */
  @Get(':id')
  async getBoardById(@Param('id') id: string) {
    const board = this.boardService.getBoardById(id);
    if (!board) throw new NotFoundException('board does not exists');
    return board;
  }

  /**
   * Creates a new board.
   * @param data - The data for creating the new board.
   * @returns The created board object.
   */
  @Post('register')
  async createBoard(@Body() data: Board) {
    return this.boardService.createBoard(data);
  }

  /**
   * Updates an existing board.
   * @param id - The unique identifier of the board to be updated.
   * @param data - The updated data for the board.
   * @returns The updated board object.
   * @throws NotFoundException if the board does not exist.
   */
  @Put('edit/:id')
  async updateBoard(@Param('id') id: string, @Body() data: Board) {
    try {
      return await this.boardService.updateBoard(id, data);
    } catch (error) {
      throw new NotFoundException('board does not exists');
    }
  }

  /**
   * Deletes a board by their unique identifier.
   * @param id - The unique identifier of the board to be deleted.
   * @returns The deleted board object.
   * @throws NotFoundException if the board does not exist.
   */
  @Delete('delete/:id')
  async deleteBoard(@Param('id') id: string) {
    try {
      return await this.boardService.deleteBoard(id);
    } catch (error) {
      throw new NotFoundException('board does not exists');
    }
  }
}
