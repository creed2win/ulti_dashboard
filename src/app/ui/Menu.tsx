import { db } from "~/server/db";
import MenuItem from "./MenuItem";
import { preschool_menus } from "~/server/db/schema";
import { sql } from "drizzle-orm";

export default async function Menu() {

    // const result = await db
    //     .select()
    //     .from(preschool_menus)
    //     .where(sql`${preschool_menus.menuDate} BETWEEN CURRENT_DATE - INTERVAL '3 day' AND CURRENT_DATE`)

    // console.log(result)

    // const result = await db.select().from(preschool_menus).orderBy(preschool_menus.menuDate)
    return (
        <>
            {/* {
                result.map((menuDay) => (
                    <MenuItem
                        key={menuDay.menuDate}
                        menuDate={menuDay.menuDate}
                        dayOfWeek={menuDay.dayOfWeek}
                        morningSnack={menuDay.morningSnack}
                        soup={menuDay.soup}
                        lunch={menuDay.lunch}
                        afternoonSnack={menuDay.afternoonSnack}
                    />
                ))
            } */}
        </>
    )
}