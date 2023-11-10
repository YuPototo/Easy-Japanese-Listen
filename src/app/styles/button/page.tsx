import { Button } from '@/components/ui/button'

export default async function Page() {
    return (
        <main className="">
            <h1>Button Page</h1>
            <table>
                <thead>
                    <tr>
                        <th>btnColor</th>
                        <th>fill</th>
                        <th>button</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>orange</td>
                        <td>fill</td>
                        <td>
                            <Button>Hello</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>orange</td>
                        <td>outline</td>
                        <td>
                            <Button fill="outline">Hello</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>red</td>
                        <td>fill</td>
                        <td>
                            <Button btnColor="red">Hello</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>red</td>
                        <td>outline</td>
                        <td>
                            <Button btnColor="red" fill="outline">
                                Hello
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td>gray</td>
                        <td>fill</td>
                        <td>
                            <Button btnColor="gray" fill="fill">
                                Hello
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td>gray</td>
                        <td>outline</td>
                        <td>
                            <Button btnColor="gray" fill="outline">
                                Hello
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </main>
    )
}
