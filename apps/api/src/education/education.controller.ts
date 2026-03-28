import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { EducationService } from './education.service';

@ApiTags('education')
@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Get()
  @ApiOperation({ summary: 'List all education modules' })
  findAll() {
    return this.educationService.findAll();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get a module by slug (e.g. how-hiv-self-testing-works)' })
  findOne(@Param('slug') slug: string) {
    return this.educationService.findOne(slug);
  }
}
