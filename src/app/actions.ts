'use server'

import { JSDOM } from 'jsdom';
import sharp from 'sharp';
import { createWorker } from 'tesseract.js';
import { db } from '~/server/db';
import { preschool_menus } from '~/server/db/schema';
import fs from 'fs'

export type MenuDay = {
    date: Date,
    dayOfWeek: string,
    morningSnack: string,
    soup: string,
    lunch: string,
    afternoonSnack: string,
}

export async function scrapeMenu() {
    let menuDay: MenuDay

    // getting URLs of Menus from website
    const BASE_MS_URL = "https://msduha.estranky.cz"
    const response = await fetch('https://msduha.estranky.cz/clanky/jidelnicek.html')
    const html = await response.text()
    const dom = new JSDOM(html)

    const imgs = dom.window.document.querySelectorAll('img')

    for (const img of imgs) {
        if (img.src.includes("jidelnicek")) {
            const url = BASE_MS_URL + img.src
            console.log('URL: ', url)
            getTextFromImage(url)
        }
    }

    async function getTextFromImage(url: string) {
        const imageId = crypto.randomUUID()

        // contrast adjustment
        try {
            const response = await fetch(url)
            const buffer = await response.bytes()
            await sharp(buffer)
                .greyscale()
                .modulate({
                    brightness: 2,
                    saturation: 1,
                    hue: 0
                })
                .sharpen({ sigma: 2 })
                .normalise()
                .toFile(`./${imageId}.jpeg`)
        } catch (error) {
            console.log(error)
        }

        // OCR from image of menu
        // Path to worker.js file had to be adjusted to static path of package. 
        // This wount work for new project with freshly installed dependencies.
        const worker = await createWorker('ces')
        console.log('created worker for CES OCR')
        const ret = await worker.recognize(`${imageId}.jpeg`)
        console.log('got data from OCR image: ', imageId + '.jpeg')
        const ocrText = ret.data.text.toLowerCase()
        await parseText(ocrText)
        await worker.terminate();

        //delete already read file
        fs.unlink(`./${imageId}.jpeg`, (err) => {
            if (err) {
                console.log('Error deleting file:', err)
                return
            }
            console.log(`File ${imageId}.jpeg deleted successfully.`)
        })
    }

    // we want to read from line starting with a dayOfWeek then 4 lines with all daily items
    // Friday is problematic because it has changing number of items
    // implemented parsing - this just idea - not working properly
    // alternative - use Google AI Studio to parse the text for me?
    async function parseText(ocrText: string) {
        const lines = ocrText.split("\n")
        const regex = /^(?:obě|p|sv|ut|út|st|ct|čt)/
        const matches = lines.filter((str) => regex.test(str))
        const splitToDays = splitArrayOnDays(matches)

        // splitToDays.forEach(async (arr) =>

        for (const day of splitToDays) {
            const splitDay = day[0]?.split(" ")

            let dateString = ''
            let date: Date
            if (splitDay) {
                dateString = splitDay[1] ?? ""

                const parts = dateString?.split(".")
                if (parts?.length === 3) {
                    const day = parts[0] ?? ""
                    const month = parts[1] ?? ""
                    const year = parts[2] ?? ""

                    date = new Date(Number(year), Number(month) - 1, Number(day), 12, 0, 0)

                } else {
                    throw new Error('Date has invalid format.')
                }

                const dayOfWeek = splitDay[0] ?? ""
                if (dateString) {
                    menuDay = {
                        date: date,
                        dayOfWeek: dayOfWeek,
                        morningSnack: day[1] ?? "",
                        soup: day[2] ?? "",
                        lunch: day[3] ?? "",
                        afternoonSnack: day[4] ?? "",
                    }
                } else {
                    console.log('no day string found')
                }


            } else {
                console.log("no day to split")
            }

            //save menuDay to DB
            try {


                const result = await db
                    .insert(preschool_menus)
                    .values({
                        dayOfWeek: menuDay.dayOfWeek,
                        menuDate: menuDay.date.toUTCString(),
                        morningSnack: menuDay.morningSnack,
                        soup: menuDay.soup,
                        lunch: menuDay.lunch,
                        afternoonSnack: menuDay.afternoonSnack,
                    })
                    .onConflictDoUpdate({
                        target: preschool_menus.menuDate,
                        set: {
                            dayOfWeek: menuDay.dayOfWeek,
                            morningSnack: menuDay.morningSnack,
                            soup: menuDay.soup,
                            lunch: menuDay.lunch,
                            afternoonSnack: menuDay.afternoonSnack,

                        }
                    })
                    .returning()
                console.log('Updated row in database: ', result)
            } catch (error) {
                console.log("Error while inseting into DBL:", error)
            }
        }
    }

    //get from array of random lines split array starting with day of the week and then menu items
    function splitArrayOnDays(arr: string[]) {
        const result = []
        let currentChunk: string[] = []

        for (const line of arr) {

            if (line?.startsWith("pond")
                || line?.startsWith("ut")
                || line?.startsWith("út")
                || line?.startsWith("st")
                || line?.startsWith("čt")
                || line?.startsWith("ct")
                || line?.startsWith("pa")
                || line?.startsWith("pá")
            ) {
                if (currentChunk.length > 0) {
                    result.push(currentChunk)
                }
                currentChunk = [line]
            } else {
                currentChunk.push(line ?? "not found")
            }
        }
        if (currentChunk.length > 0) {
            result.push(currentChunk);
        }
        return result
    }
}
