const { Client } = require("pg")

async function testConnection() {
  // Test pooled connection
  const pooledClient = new Client({
    connectionString:
      "postgresql://postgres.bxlrlivqfrvkemnflucq:Larry110%23@aws-0-ap-south-1.pooler.supabase.com:6543/postgres",
  })

  try {
    console.log("Testing pooled connection...")
    await pooledClient.connect()
    const result = await pooledClient.query("SELECT NOW()")
    console.log("✅ Pooled connection successful:", result.rows[0])
    await pooledClient.end()
  } catch (error) {
    console.log("❌ Pooled connection failed:", error.message)
  }

  // Test direct connection
  const directClient = new Client({
    connectionString: "postgresql://postgres:Larry110%23@db.bxlrlivqfrvkemnflucq.supabase.co:5432/postgres",
  })

  try {
    console.log("Testing direct connection...")
    await directClient.connect()
    const result = await directClient.query("SELECT NOW()")
    console.log("✅ Direct connection successful:", result.rows[0])
    await directClient.end()
  } catch (error) {
    console.log("❌ Direct connection failed:", error.message)
  }
}

testConnection()
