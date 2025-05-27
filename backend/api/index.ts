import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { AppModule } from "../src/app.module"

let app: any

async function createApp() {
  if (!app) {
    app = await NestFactory.create(AppModule)

    app.enableCors({
      origin: true,
      credentials: true,
    })

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    )

    app.setGlobalPrefix("api")
    await app.init()
  }
  return app
}

export default async function handler(req: any, res: any) {
  const app = await createApp()
  return app.getHttpAdapter().getInstance()(req, res)
}
