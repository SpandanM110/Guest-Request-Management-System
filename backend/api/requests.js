// Fixed requests endpoint with CORS headers
module.exports = async (req, res) => {
  // Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.status(200).end()
    return
  }

  try {
    // Import Prisma inside the function to avoid cold start issues
    const { PrismaClient } = require("@prisma/client")

    // Create Prisma client with explicit configuration
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    })

    if (req.method === "GET") {
      const requests = await prisma.requests.findMany({
        where: { status: "pending" },
        orderBy: { createdAt: "desc" },
      })

      await prisma.$disconnect()
      return res.json(requests)
    }

    if (req.method === "POST") {
      const { guestPhone, requestText } = req.body

      if (!guestPhone || !requestText) {
        await prisma.$disconnect()
        return res.status(400).json({ error: "Phone and request text are required" })
      }

      const request = await prisma.requests.create({
        data: {
          guestPhone,
          requestText,
          status: "pending",
        },
      })

      await prisma.$disconnect()
      return res.status(201).json(request)
    }

    await prisma.$disconnect()
    return res.status(405).json({ error: "Method not allowed" })
  } catch (error) {
    console.error("Error:", error)
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    })
  }
}
