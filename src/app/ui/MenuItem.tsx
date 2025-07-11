import type { MenuDay } from "../actions"

export default function MenuItem({ menuDate, dayOfWeek, morningSnack, lunch, afternoonSnack }: {
    menuDate?: string,
    dayOfWeek?: string,
    morningSnack?: string,
    lunch?: string,
    afternoonSnack?: string,
}) {

    return (
        <div>
            <p>Date: {menuDate}</p>
            <p>{dayOfWeek}</p>
            <p>{morningSnack}</p>
            <p>{lunch}</p>
            <p>{afternoonSnack}</p>
        </div>
    )
}