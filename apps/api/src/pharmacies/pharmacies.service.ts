import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';

interface FindAllOptions {
  lat?: number;
  lng?: number;
  search?: string;
  locationType?: 'PHARMACY' | 'TESTING_CENTER';
}

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const INCLUDE_KITS = { testKits: { include: { kit: true } } };

@Injectable()
export class PharmaciesService {
  constructor(private prisma: PrismaService) {}

  async findAll({ lat, lng, search, locationType }: FindAllOptions) {
    const pharmacies = await this.prisma.pharmacy.findMany({
      where: {
        ...(locationType ? { locationType } : {}),
        ...(search
          ? {
              OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { address: { contains: search, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      include: INCLUDE_KITS,
      orderBy: { name: 'asc' },
    });

    if (!lat || !lng) return pharmacies;

    return pharmacies
      .map((p) => ({ ...p, distanceKm: haversineKm(lat, lng, p.latitude, p.longitude) }))
      .sort((a, b) => a.distanceKm - b.distanceKm);
  }

  async findOne(id: string) {
    const pharmacy = await this.prisma.pharmacy.findUnique({
      where: { id },
      include: INCLUDE_KITS,
    });
    if (!pharmacy) throw new NotFoundException(`Pharmacy ${id} not found`);
    return pharmacy;
  }

  async create(dto: CreatePharmacyDto) {
    return this.prisma.pharmacy.create({
      data: { ...dto, isOpen: dto.isOpen ?? true, city: dto.city ?? 'Addis Ababa' },
      include: INCLUDE_KITS,
    });
  }

  async update(id: string, dto: UpdatePharmacyDto) {
    await this.findOne(id);
    return this.prisma.pharmacy.update({
      where: { id },
      data: dto,
      include: INCLUDE_KITS,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.pharmacyKit.deleteMany({ where: { pharmacyId: id } });
    return this.prisma.pharmacy.delete({ where: { id } });
  }

  async stats() {
    const [total, open, pharmacies, centers] = await Promise.all([
      this.prisma.pharmacy.count(),
      this.prisma.pharmacy.count({ where: { isOpen: true } }),
      this.prisma.pharmacy.count({ where: { locationType: 'PHARMACY' } }),
      this.prisma.pharmacy.count({ where: { locationType: 'TESTING_CENTER' } }),
    ]);
    return { total, open, closed: total - open, pharmacies, centers };
  }
}
