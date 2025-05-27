import { Module } from "@nestjs/common"
import { PrismaModule } from "./prisma/prisma.module"
import { RequestsModule } from "./requests/requests.module"

@Module({
  imports: [PrismaModule, RequestsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
