import Link from 'next/link'

async function getData() {
    const res = await fetch(
        'http://localhost:3000/playNextJs/serverFetch/fetchMethod/forceRefresh/api',
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
            <h2>Force Refresh</h2>
            <div className="my-4">
                <div>Result</div>
                <div className="bg-yellow-50">{JSON.stringify(data)}...</div>
            </div>

            <div className="mt-4">
                如果在这个页面 refresh，服务器会重新请求数据。 可以在 terminal
                里看到：GET /playNextJs/serverFetch/fetchMethod/forceRefresh/api
            </div>

            <div className="mt-4">
                对比：
                <Link
                    className="text-blue-500"
                    href="/playNextJs/serverFetch/fetchMethod/success"
                >
                    Successful Fetch
                </Link>
                <div>
                    在这个页面，如果 refresh，服务器不会重新请求数据。 Terminal
                    里也看不到 log。
                </div>
            </div>
        </main>
    )
}
