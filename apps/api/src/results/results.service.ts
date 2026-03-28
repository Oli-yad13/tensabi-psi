import { Injectable, NotFoundException } from '@nestjs/common';
import { ResultType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateResultDto } from './dto/create-result.dto';

const NEXT_STEPS: Record<ResultType, string[]> = {
  NEGATIVE: [
    'Your test did not detect HIV antibodies at this time.',
    'If exposed in the last 3 months, retest after the window period.',
    'Continue using protection (condoms, PrEP) to stay negative.',
    'Regular testing every 3–6 months if at ongoing risk.',
  ],
  POSITIVE: [
    'A confirmatory test at a health facility is required.',
    'Visit a health facility for a confirmatory blood test.',
    'Speak with a counselor — you don\'t have to do this alone.',
    'With early treatment, people with HIV can live full, healthy lives.',
  ],
  INVALID: [
    'The test result could not be read.',
    'Make sure to follow all instructions carefully.',
    'Check the expiry date of the test kit.',
    'Retest with a new kit or visit a health facility.',
  ],
};

@Injectable()
export class ResultsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateResultDto) {
    const record = await this.prisma.testResult.create({
      data: {
        result: dto.result,
        nextSteps: NEXT_STEPS[dto.result],
        ...(dto.sessionId ? { sessionId: dto.sessionId } : {}),
      },
    });
    return { sessionId: record.sessionId, result: record.result, nextSteps: record.nextSteps };
  }

  async getNextSteps(sessionId: string) {
    const record = await this.prisma.testResult.findUnique({ where: { sessionId } });
    if (!record) throw new NotFoundException('Session not found');
    return { result: record.result, nextSteps: record.nextSteps };
  }
}
