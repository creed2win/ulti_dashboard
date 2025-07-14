import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Utensils } from "lucide-react"
import { db } from "~/server/db"
import { preschool_menus } from "~/server/db/schema"
import { sql } from "drizzle-orm"

interface DayMenu {
  dayOfWeek: string
  menuDate: string
  morningSnack: string
  soup: string
  lunch: string
  afternoonSnack: string
  isToday?: boolean
  isTomorrow?: boolean
}

export default async function CafeteriaMenu() {
  // getting data from db
  const result = await db
    .select()
    .from(preschool_menus)
    .where(sql`${preschool_menus.menuDate} BETWEEN  CURRENT_DATE - INTERVAL '7 day' AND CURRENT_DATE`)

  const menuItems: DayMenu[] = result.map((row) => ({
    dayOfWeek: row.dayOfWeek,
    menuDate: row.menuDate,
    morningSnack: row.morningSnack,
    soup: row.soup,
    lunch: row.lunch,
    afternoonSnack: row.afternoonSnack,
  }))

  if (menuItems[0]) {
    menuItems[0].isToday = true
  }

  if (menuItems[1]) {
    menuItems[1].isTomorrow = true
  }

  menuItems.forEach((item) => {
    item.dayOfWeek = item.dayOfWeek.toLocaleUpperCase()
  })


  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Utensils className="h-8 w-8 text-orange-600" />
          Jídelníček - MŠ Duha
        </h1>
      </div>

      <div className="flex flex-col gap-4 ">
        {menuItems.map((dayMenu, index) => (
          <Card
            key={index}
            className={`transition-all duration-300 hover:shadow-lg ${dayMenu.isTomorrow
              ? "bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 shadow-lg transform scale-105"
              : dayMenu.isToday
                ? "bg-gradient-to-br from-blue-50 to-sky-50 border-blue-200"
                : "bg-white border-gray-200"
              }`}
          >
            {dayMenu.isTomorrow ? (
              // Tomorrow's card - make it prominent
              <>
                <CardHeader className="pb-3 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CardTitle className="text-2xl font-semibold">{dayMenu.dayOfWeek}</CardTitle>
                    <Badge className="bg-green-100 text-green-800 border-green-300">Zítra</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{dayMenu.menuDate}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1 text-base">Ranní svačina</h4>
                      <p className="text-gray-700 text-base font-medium">{dayMenu.morningSnack}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1 text-base">Polévka</h4>
                      <p className="text-gray-700 text-base">{dayMenu.soup}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1 text-base">Oběd</h4>
                      <p className="text-gray-700 text-base">{dayMenu.lunch}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1 text-base">Odpolední svačina</h4>
                      <p className="text-gray-700 text-base">{dayMenu.afternoonSnack}</p>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              // Compact design for other days
              <div className="px-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-base font-semibold text-gray-800">{dayMenu.dayOfWeek}</h3>
                    <p className="text-xs text-gray-500">{dayMenu.menuDate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <p className="font-medium text-gray-700">
                      Ranní svačina: <span className="font-normal">{dayMenu.morningSnack}</span>
                    </p>
                    <p className="font-medium text-gray-700">
                      Polévka: <span className="font-normal">{dayMenu.soup}</span>
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-gray-700">
                      Oběd: <span className="font-normal">{dayMenu.lunch}</span>
                    </p>
                    <p className="font-medium text-gray-700">
                      Odpolední svačina: <span className="font-normal">{dayMenu.afternoonSnack}</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>


    </div>
  )
}