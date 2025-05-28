// Main API endpoint with CORS headers
module.exports = (req, res) => {
  // Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.status(200).end()
    return
  }

  res.json({
    message: "API is working!",
    timestamp: new Date().toISOString(),
  })
}
