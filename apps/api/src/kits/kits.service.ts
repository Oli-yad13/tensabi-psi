import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateKitDto } from './dto/create-kit.dto';
import { UpdateKitDto } from './dto/update-kit.dto';

@Injectable()
export class KitsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const kits = await this.prisma.testKit.findMany({
      include: { pharmacies: { include: { pharmacy: true } } },
      orderBy: { name: 'asc' },
    });
    return kits.map((kit) => ({ ...kit, priceETB: kit.minPriceETB }));
  }

  async findOne(id: string) {
    const kit = await this.prisma.testKit.findUnique({
      where: { id },
      include: { pharmacies: { include: { pharmacy: true } } },
    });
    if (!kit) throw new NotFoundException(`Test kit ${id} not found`);
    return { ...kit, priceETB: kit.minPriceETB };
  }

  create(dto: CreateKitDto) {
    return this.prisma.testKit.create({
      data: {
        name: dto.name,
        type: dto.type,
        sampleType: dto.sampleType,
        minPriceETB: dto.priceETB,
        maxPriceETB: dto.priceETB,
      },
    });
  }

  async update(id: string, dto: UpdateKitDto) {
    await this.findOne(id);
    const data = {
      ...(dto.name !== undefined ? { name: dto.name } : {}),
      ...(dto.type !== undefined ? { type: dto.type } : {}),
      ...(dto.sampleType !== undefined ? { sampleType: dto.sampleType } : {}),
      ...(dto.priceETB !== undefined
        ? { minPriceETB: dto.priceETB, maxPriceETB: dto.priceETB }
        : {}),
    };

    if (dto.priceETB !== undefined) {
      await this.prisma.pharmacyKit.updateMany({
        where: { kitId: id },
        data: { priceETB: dto.priceETB },
      });
    }

    return this.prisma.testKit.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.pharmacyKit.deleteMany({ where: { kitId: id } });
    return this.prisma.testKit.delete({ where: { id } });
  }
}
