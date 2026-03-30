import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateKitDto } from './dto/create-kit.dto';
import { UpdateKitDto } from './dto/update-kit.dto';

@Injectable()
export class KitsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.testKit.findMany({
      include: { pharmacies: { include: { pharmacy: true } } },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const kit = await this.prisma.testKit.findUnique({
      where: { id },
      include: { pharmacies: { include: { pharmacy: true } } },
    });
    if (!kit) throw new NotFoundException(`Test kit ${id} not found`);
    return kit;
  }

  create(dto: CreateKitDto) {
    return this.prisma.testKit.create({ data: dto });
  }

  async update(id: string, dto: UpdateKitDto) {
    await this.findOne(id);
    return this.prisma.testKit.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.pharmacyKit.deleteMany({ where: { kitId: id } });
    return this.prisma.testKit.delete({ where: { id } });
  }
}
