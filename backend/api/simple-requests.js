// Simplified requests endpoint without Prisma to test basic functionality
module.exports = async (req, res) => {
  try {
    if (req.method === "GET") {
      // Return mock data first to test if the endpoint works
      return res.json([
        {
          id: 1,
          guestPhone: "+1234567890",
          requestText: "Mock request",
          createdAt: new Date().toISOString(),
          status: "pending",
        },
      ])
    }

    if (req.method === "POST") {
      const { guestPhone, requestText } = req.body

      if (!guestPhone || !requestText) {
        return res.status(400).json({ error: "Phone and request text are required" })
      }

      // Return mock created request
      return res.status(201).json({
        id: Date.now(),
        guestPhone,
        requestText,
        createdAt: new Date().toISOString(),
        status: "pending",
      })
    }

    return res.status(405).json({ error: "Method not allowed" })
  } catch (error) {
    console.error("Error:", error)
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    })
  }
}
