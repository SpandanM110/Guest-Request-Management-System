import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRequestDto } from './dto/create-request.dto';

@Injectable()
export class RequestsService {
  constructor(private prisma: PrismaService) {}

  async createRequest(createRequestDto: CreateRequestDto) {
    const { guestPhone, requestText } = createRequestDto;
    
    return this.prisma.requests.create({
      data: {
        guestPhone,
        requestText,
        status: 'pending',
      },
    });
  }

  async getPendingRequests() {
    return this.prisma.requests.findMany({
      where: {
        status: 'pending',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
