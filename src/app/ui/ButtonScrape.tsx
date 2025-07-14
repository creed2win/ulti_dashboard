'use client'

import { scrapeMenu } from "../actions"
import { Button } from "../../components/ui/button"

export function ButtonScrape() {
    return (
        <form>
            <Button variant="outline" formAction={scrapeMenu} className="bg-black/60 p-3 rounded-xl">Stáhnout jídelníček</Button>
        </form>
    )
}