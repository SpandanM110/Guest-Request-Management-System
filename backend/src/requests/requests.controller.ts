import { Controller, Get, Post, Body } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  async createRequest(@Body() createRequestDto: CreateRequestDto) {
    return this.requestsService.createRequest(createRequestDto);
  }

  @Get()
  async getPendingRequests() {
    return this.requestsService.getPendingRequests();
  }
}
