export async function GET() {
    console.log('GET /playNextJs/serverFetch/fetchMethod/error/api')

    const random = Math.random()
    console.log('random', random)

    if (random < 0.5) {
        return Response.error()
    }

    const data = {
        message: 'This is from an error api, but it works this time',
    }

    return Response.json({ data })
}
