'use client'

import { scrapeMenu } from "../actions"

export function Button() {
    return (
        <form>
            <button formAction={scrapeMenu}>Start scrape</button>
        </form>
    )
}