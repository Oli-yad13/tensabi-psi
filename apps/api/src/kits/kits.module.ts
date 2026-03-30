import { Module } from '@nestjs/common';
import { KitsController } from './kits.controller';
import { KitsService } from './kits.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [KitsController],
  providers: [KitsService],
})
export class KitsModule {}
