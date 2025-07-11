'use client'

import { scrapeMenu } from "../actions"

export function Button() {
    return (
        <form>
            <button formAction={scrapeMenu} className="bg-black/60 p-3 rounded-xl">Start scrape</button>
        </form>
    )
}