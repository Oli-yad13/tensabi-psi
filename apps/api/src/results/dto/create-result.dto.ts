import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ResultType } from '@prisma/client';

export class CreateResultDto {
  @ApiProperty({ enum: ResultType })
  @IsEnum(ResultType)
  result: ResultType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sessionId?: string;
}
