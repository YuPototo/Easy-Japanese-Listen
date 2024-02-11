export async function GET() {
    console.log('GET /playNextJs/serverFetch/fetchMethod/success/api')
    const data = { message: 'Cached Api' }

    return Response.json({ data })
}
