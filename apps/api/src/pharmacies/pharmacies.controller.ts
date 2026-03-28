import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { PharmaciesService } from './pharmacies.service';

@ApiTags('pharmacies')
@Controller('pharmacies')
export class PharmaciesController {
  constructor(private readonly pharmaciesService: PharmaciesService) {}

  @Get()
  @ApiOperation({ summary: 'List pharmacies near a location' })
  @ApiQuery({ name: 'lat', required: false, type: Number })
  @ApiQuery({ name: 'lng', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  findAll(
    @Query('lat') lat?: string,
    @Query('lng') lng?: string,
    @Query('search') search?: string,
  ) {
    return this.pharmaciesService.findAll({
      lat: lat ? parseFloat(lat) : undefined,
      lng: lng ? parseFloat(lng) : undefined,
      search,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get pharmacy details with available kits' })
  findOne(@Param('id') id: string) {
    return this.pharmaciesService.findOne(id);
  }
}
