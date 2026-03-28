import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { PharmaciesModule } from './pharmacies/pharmacies.module';
import { EducationModule } from './education/education.module';
import { ResultsModule } from './results/results.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    PharmaciesModule,
    EducationModule,
    ResultsModule,
  ],
})
export class AppModule {}
