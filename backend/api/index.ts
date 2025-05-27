import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { AppModule } from "../src/app.module"

let app: any

async function createApp() {
  if (!app) {
    app = await NestFactory.create(AppModule)

    app.enableCors({
      origin: ["http://localhost:3001", "https://intern-task-3jof.vercel.app", "https://*.vercel.app"],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })

    app.setGlobalPrefix("api")
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    )
    await app.init()
  }
  return app
}

export default async function handler(req: any, res: any) {
  const app = await createApp()
  return app.getHttpAdapter().getInstance()(req, res)
}
