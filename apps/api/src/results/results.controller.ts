import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ResultsService } from './results.service';
import { CreateResultDto } from './dto/create-result.dto';

@ApiTags('results')
@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Post()
  @ApiOperation({ summary: 'Log an anonymous test result' })
  create(@Body() dto: CreateResultDto) {
    return this.resultsService.create(dto);
  }

  @Get(':sessionId/next-steps')
  @ApiOperation({ summary: 'Get next steps for a result session' })
  getNextSteps(@Param('sessionId') sessionId: string) {
    return this.resultsService.getNextSteps(sessionId);
  }
}
