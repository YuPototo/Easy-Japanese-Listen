import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/database/database.types";
import { cache } from "react";

export const revalidate = 3600; // revalidate the data at most every hour

const getSections = cache(async () => {
    const supabase = createClientComponentClient<Database>();
    const { data } = await supabase.from("test_section").select("*");
    return data;
});

export default async function SectionGrid() {
    const sections = await getSections();

    return (
        <div>
            {sections?.map((el) => (
                <div className="m-2" key={el.id}>
                    {el.section_name}
                </div>
            ))}
        </div>
    );
}
