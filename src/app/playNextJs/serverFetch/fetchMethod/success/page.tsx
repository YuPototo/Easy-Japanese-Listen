async function getData() {
    const res = await fetch(
        'http://localhost:3000/playNextJs/serverFetch/fetchMethod/success/api',
    )

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function Page() {
    const data = await getData()
    return (
        <main className="p-4">
            <h2>Successful get</h2>

            <div className="mt-10">Result</div>
            <div className="bg-yellow-50">{JSON.stringify(data)}...</div>
        </main>
    )
}
