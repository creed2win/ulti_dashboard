'use client'

import { scrapeMenu } from "~/app/actions"
import { Button } from "~/components/ui/button"
import { useState } from "react"
import SpinnerCircleDemo from "~/components/customized/spinner/spinner-02"

export function ButtonScrape({ id }: { id: string }) {
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
            <div className="flex">
                <div className="p-1">
                    {isLoading ? <SpinnerCircleDemo /> : <></>}
                </div>
                <Button disabled={isLoading} variant="outline" className="bg-black/60 p-3 rounded-xl">{isLoading ? "Načítání..." : "Stáhnout jídelníček"}</Button>
            </div>
        </form>
    )
}