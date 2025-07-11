import { db } from "~/server/db";
import MenuItem from "./MenuItem";
import { preschool_menus } from "~/server/db/schema";

export default async function Menu() {

    const result = await db.select().from(preschool_menus).orderBy(preschool_menus.menuDate)
    console.log(result)
    return (
        <>
            {
                result.map((menuDay) => (
                    <MenuItem
                        key={menuDay.menuDate}
                        menuDate={menuDay.menuDate}
                        dayOfWeek={menuDay.dayOfWeek}
                        morningSnack={menuDay.morningSnack}
                        lunch={menuDay.lunch}
                        afternoonSnack={menuDay.afternoonSnack}
                    />
                ))
            }
        </>
    )
}