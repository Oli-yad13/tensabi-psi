import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EducationService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.educationModule.findMany({
      orderBy: { order: 'asc' },
      select: { id: true, slug: true, title: true, description: true, order: true },
    });
  }

  async findOne(slug: string) {
    const module = await this.prisma.educationModule.findUnique({
      where: { slug },
      include: { sections: { orderBy: { order: 'asc' } } },
    });
    if (!module) throw new NotFoundException(`Module "${slug}" not found`);
    return module;
  }
}
