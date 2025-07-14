import type { MenuDay } from "../actions"

export default function MenuItem({ menuDate, dayOfWeek, morningSnack, soup, lunch, afternoonSnack }: {
    menuDate?: string,
    dayOfWeek?: string,
    morningSnack?: string,
    soup?: string,
    lunch?: string,
    afternoonSnack?: string,
}) {

    return (
        <div>
            <p>Date: {menuDate}</p>
            <p>{dayOfWeek}</p>
            <p>{morningSnack}</p>
            <p>{soup}</p>
            <p>{lunch}</p>
            <p>{afternoonSnack}</p>
        </div>
    )
}