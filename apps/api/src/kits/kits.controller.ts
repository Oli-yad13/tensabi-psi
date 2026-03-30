import { Controller, Get, Post, Patch, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { KitsService } from './kits.service';
import { CreateKitDto } from './dto/create-kit.dto';
import { UpdateKitDto } from './dto/update-kit.dto';

@ApiTags('kits')
@Controller('kits')
export class KitsController {
  constructor(private readonly kitsService: KitsService) {}

  @Get()
  @ApiOperation({ summary: 'List all test kits' })
  findAll() {
    return this.kitsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get test kit details' })
  findOne(@Param('id') id: string) {
    return this.kitsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a test kit (admin)' })
  create(@Body() dto: CreateKitDto) {
    return this.kitsService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a test kit (admin)' })
  update(@Param('id') id: string, @Body() dto: UpdateKitDto) {
    return this.kitsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a test kit (admin)' })
  remove(@Param('id') id: string) {
    return this.kitsService.remove(id);
  }
}
