import { Controller, Get, Post, Patch, Delete, Param, Query, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { PharmaciesService } from './pharmacies.service';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';

@ApiTags('pharmacies')
@Controller('pharmacies')
export class PharmaciesController {
  constructor(private readonly pharmaciesService: PharmaciesService) {}

  @Get()
  @ApiOperation({ summary: 'List pharmacies (optionally near a location)' })
  @ApiQuery({ name: 'lat', required: false, type: Number })
  @ApiQuery({ name: 'lng', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'type', required: false, enum: ['PHARMACY', 'TESTING_CENTER'] })
  findAll(
    @Query('lat') lat?: string,
    @Query('lng') lng?: string,
    @Query('search') search?: string,
    @Query('type') type?: string,
  ) {
    return this.pharmaciesService.findAll({
      lat: lat ? parseFloat(lat) : undefined,
      lng: lng ? parseFloat(lng) : undefined,
      search,
      locationType: type as any,
    });
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get pharmacy counts for admin dashboard' })
  stats() {
    return this.pharmaciesService.stats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get pharmacy details with available kits' })
  findOne(@Param('id') id: string) {
    return this.pharmaciesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new pharmacy (admin)' })
  create(@Body() dto: CreatePharmacyDto) {
    return this.pharmaciesService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a pharmacy (admin)' })
  update(@Param('id') id: string, @Body() dto: UpdatePharmacyDto) {
    return this.pharmaciesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a pharmacy and its kit assignments (admin)' })
  remove(@Param('id') id: string) {
    return this.pharmaciesService.remove(id);
  }
}
