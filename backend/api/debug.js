// Debug endpoint with CORS headers
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

  const envVars = {
    DATABASE_URL: process.env.DATABASE_URL ? "SET" : "NOT SET",
    SUPABASE_URL: process.env.SUPABASE_URL ? "SET" : "NOT SET",
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ? "SET" : "NOT SET",
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? "SET" : "NOT SET",
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: process.env.VERCEL,
  }

  res.json({
    message: "Debug endpoint",
    timestamp: new Date().toISOString(),
    env: envVars,
    allEnvKeys: Object.keys(process.env).filter(
      (key) => key.startsWith("DATABASE_") || key.startsWith("SUPABASE_") || key.startsWith("VERCEL"),
    ),
  })
}
