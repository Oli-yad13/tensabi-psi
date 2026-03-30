import { IsString, IsNumber, IsBoolean, IsOptional, IsObject, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum LocationType {
  PHARMACY = 'PHARMACY',
  TESTING_CENTER = 'TESTING_CENTER',
}

export class CreatePharmacyDto {
  @ApiProperty() @IsString() name: string;
  @ApiProperty() @IsString() address: string;
  @ApiProperty({ default: 'Addis Ababa' }) @IsString() city: string;
  @ApiProperty() @IsNumber() latitude: number;
  @ApiProperty() @IsNumber() longitude: number;
  @ApiPropertyOptional() @IsOptional() @IsString() phone?: string;
  @ApiPropertyOptional({ default: true }) @IsOptional() @IsBoolean() isOpen?: boolean;
  @ApiPropertyOptional({ enum: LocationType, default: LocationType.PHARMACY })
  @IsOptional() @IsEnum(LocationType) locationType?: LocationType;
  @ApiPropertyOptional({ example: { mon: '8:00-21:00', tue: '8:00-21:00' } })
  @IsOptional() @IsObject() hoursJson?: Record<string, string>;
}
