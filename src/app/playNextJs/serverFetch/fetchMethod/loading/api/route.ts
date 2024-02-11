export async function GET() {
    console.log('GET /playNextJs/serverFetch/fetchMethod/loading/api')

    // Simulate a slow response
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const data = { message: 'Cached Api' }

    return Response.json({ data })
}
