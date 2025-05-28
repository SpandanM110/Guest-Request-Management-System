import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Enable CORS for production domains
  app.enableCors({
    origin: ["http://localhost:3001", "https://intern-task-3jof.vercel.app", "https://*.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
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

  // For Vercel serverless
  if (process.env.NODE_ENV === "production") {
    await app.init()
    return app
  }

  // For local development
  const port = process.env.PORT || 3000
  await app.listen(port)
  console.log(`Application is running on: http://localhost:${port}`)
  return app
}

// Export for Vercel
export default bootstrap

// For local development
if (require.main === module) {
  bootstrap()
}
