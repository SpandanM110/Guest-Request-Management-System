// Simple Express handler without NestJS
import express from "express"
import { json } from "body-parser"
import { PrismaClient } from "@prisma/client"

const app = express()
const prisma = new PrismaClient()

app.use(json())

<<<<<<< HEAD
app.get("/api/requests", async (req, res) => {
  try {
    const requests = await prisma.requests.findMany({
      where: { status: "pending" },
      orderBy: { createdAt: "desc" },
    })
    return res.json(requests)
  } catch (error) {
    console.error("Error fetching requests:", error)
    return res.status(500).json({ error: "Failed to fetch requests" })
  }
})

app.post("/api/requests", async (req, res) => {
  try {
    const { guestPhone, requestText } = req.body

    if (!guestPhone || !requestText) {
      return res.status(400).json({ error: "Phone and request text are required" })
    }

    const request = await prisma.requests.create({
      data: {
        guestPhone,
        requestText,
        status: "pending",
      },
    })

    return res.status(201).json(request)
  } catch (error) {
    console.error("Error creating request:", error)
    return res.status(500).json({ error: "Failed to create request" })
=======
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
>>>>>>> fd620f0177a4813ca4d5c8caacafcc0a53c4bfbd
  }
})

export default app
