import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/database/database.types";

export default async function Home() {
    const supabase = createClientComponentClient<Database>();

    const { data: testSections } = await supabase
        .from("test_section")
        .select("*");

    return (
        <main className="">
            <div>
                {testSections?.map((el) => (
                    <div className="m-2" key={el.id}>
                        {el.section_name}
                    </div>
                ))}
            </div>
        </main>
    );
}
