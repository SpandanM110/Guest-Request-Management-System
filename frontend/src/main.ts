import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Enable CORS for frontend integration
  app.enableCors({
    origin: true,
    credentials: true,
  })

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  // Set global prefix
  app.setGlobalPrefix("api")

  const port = process.env.PORT || 3001
  await app.listen(port)
  console.log(`Application is running on: http://localhost:${port}`)
}
bootstrap()
