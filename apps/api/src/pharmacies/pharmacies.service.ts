import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface FindAllOptions {
  lat?: number;
  lng?: number;
  search?: string;
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

@Injectable()
export class PharmaciesService {
  constructor(private prisma: PrismaService) {}

  async findAll({ lat, lng, search }: FindAllOptions) {
    const pharmacies = await this.prisma.pharmacy.findMany({
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { address: { contains: search, mode: 'insensitive' } },
            ],
          }
        : undefined,
      include: {
        testKits: {
          include: { kit: true },
        },
      },
      orderBy: { name: 'asc' },
    });

    if (!lat || !lng) return pharmacies;

    return pharmacies
      .map((p) => ({
        ...p,
        distanceKm: haversineKm(lat, lng, p.latitude, p.longitude),
      }))
      .sort((a, b) => a.distanceKm - b.distanceKm);
  }

  async findOne(id: string) {
    const pharmacy = await this.prisma.pharmacy.findUnique({
      where: { id },
      include: {
        testKits: {
          include: { kit: true },
        },
      },
    });
    if (!pharmacy) throw new NotFoundException(`Pharmacy ${id} not found`);
    return pharmacy;
  }
}
