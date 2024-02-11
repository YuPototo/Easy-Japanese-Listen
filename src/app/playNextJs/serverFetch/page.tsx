import Link from 'next/link'

export default async function Page() {
    return (
        <main className="">
            <div>
                <h2>Fetch Method</h2>
                <div className="mt-4 flex flex-col gap-2">
                    <Link
                        className="text-blue-500"
                        href="/playNextJs/serverFetch/fetchMethod/success"
                    >
                        Successful Fetch
                    </Link>
                    <Link
                        className="text-blue-500"
                        href="/playNextJs/serverFetch/fetchMethod/forceRefresh"
                    >
                        Force Refresh Fetch
                    </Link>
                </div>
            </div>
        </main>
    )
}
