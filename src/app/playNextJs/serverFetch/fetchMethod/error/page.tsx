export const revalidate = 0

async function getData() {
    const res = await fetch(
        'http://localhost:3000/playNextJs/serverFetch/fetchMethod/error/api',
        { cache: 'no-store' },
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
            <h2>Throwing Error when getting data</h2>
            <div>
                This page would fail 50% of the time. If it fails, it will
                activate the error.tsx page
            </div>

            <div className="mt-10">Result</div>
            <div className="bg-red-50">{JSON.stringify(data)}</div>
        </main>
    )
}
