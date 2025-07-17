'use client'

import { scrapeMenu } from "../actions"
import { Button } from "../../components/ui/button"
import { useState } from "react"

export function ButtonScrape() {
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setIsLoading(true);
        console.log("Now button should change to isLoading state", isLoading)

        try {
            await scrapeMenu()
        } catch (e) {
            console.log("error while scraping", e)
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <Button disabled={isLoading} variant="outline" className="bg-black/60 p-3 rounded-xl">{isLoading ? "Načítání..." : "Stáhnout jídelníček"}</Button>
        </form>
    )
}