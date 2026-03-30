import { IsString, IsNumber, IsEnum, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum KitType {
  ORAL_SALIVA = 'ORAL_SALIVA',
  FINGER_PRICK = 'FINGER_PRICK',
  COMBO_ANTIGEN = 'COMBO_ANTIGEN',
}

export enum SampleType {
  ORAL = 'ORAL',
  BLOOD = 'BLOOD',
  BOTH = 'BOTH',
}

export class CreateKitDto {
  @ApiProperty() @IsString() name: string;
  @ApiProperty({ enum: KitType }) @IsEnum(KitType) type: KitType;
  @ApiProperty({ enum: SampleType }) @IsEnum(SampleType) sampleType: SampleType;
  @ApiProperty() @IsNumber() @Min(0) priceETB: number;
}
