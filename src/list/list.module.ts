import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ListController],
  providers: [ListService],
  imports: [PrismaModule],
})
export class ListModule {}
