export async function GET() {
    console.log('GET /playNextJs/serverFetch/fetchMethod/forceRefresh/api')
    const data = { message: 'This is from a force refresh api' }

    return Response.json({ data })
}
