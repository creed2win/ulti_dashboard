'use server'

import { JSDOM } from 'jsdom';
import sharp from 'sharp';
import { createWorker } from 'tesseract.js';

type MenuDay = {
    date: Date,
    morningSnack: string,
    soup: string,
    lunch: string,
    afternoonSnack: string,
}

type MenuWeek = {
    dayOfWeek: DayOfWeekCZ,
    manuDay: MenuDay,
}

type DayOfWeekCZ =
    "pondeli" |
    "utery" |
    "streda" |
    "ctvrtek" |
    "patek"

export async function scrapeMenu() {
    // getting URLs of Menus from website
    const BASE_MS_URL = "https://msduha.estranky.cz"
    const response = await fetch('https://msduha.estranky.cz/clanky/jidelnicek.html')
    const html = await response.text()
    const dom = new JSDOM(html)

    const imgs = dom.window.document.querySelectorAll('img')
    imgs.forEach(async (img) => {
        if (img.src.includes("jidelnicek")) {
            const url = BASE_MS_URL + img.src
            console.log('URL: ', url)
            await getTextFromImage(url)
        }
    });

    async function getTextFromImage(url: string) {
        // testing of contrast adjustment
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
                .toFile('./adjustedMenu.jpeg')
        } catch (error) {
            console.log(error)
        }

        // OCR from image of menu
        // Path to worker.js file had to be adjusted to static path of package. 
        // This wount work for new project with freshly installed dependencies.
        const worker = await createWorker('ces');
        console.log('created worker for CES OCR')
        const ret = await worker.recognize('adjustedMenu.jpeg');
        console.log('got data from OCR')
        const ocrText = ret.data.text
        console.log(ocrText)
        parseText(ocrText.toLowerCase())
        //TODO - save menuWeek object to database
        await worker.terminate();

    }

    // we want to read from line starting with a dayOfWeek then 4 lines with all daily items
    // Friday is problematic because it has changing number of items
    //TODO - implement parsing - this just idea - not working properly
    //alternative - use Google AI Studio to parse the text for me?
    function parseText(ocrText: string) {
        const lines = ocrText.split("\n")
        const dayLines: string[] = []
        lines.forEach((line, index) => {
            if (line.startsWith("pon")) {
                dayLines.push(line)
                if (lines[index + 1]?.startsWith("p")) dayLines.push(lines[index + 1] || "nenalezeno")
                if (lines[index + 2]?.startsWith("p")) dayLines.push(lines[index + 2] || "nenalezeno")
                if (lines[index + 3]?.startsWith("po")) dayLines.push(lines[index + 3] || "nenalezeno")
                if (lines[index + 4]?.startsWith("po")) dayLines.push(lines[index + 4] || "nenalezeno")
                if (lines[index + 5]?.startsWith("ob")) dayLines.push(lines[index + 5] || "nenalezeno")
                if (lines[index + 6]?.startsWith("ob")) dayLines.push(lines[index + 6] || "nenalezeno")
                if (lines[index + 7]?.startsWith("sv")) dayLines.push(lines[index + 7] || "nenalezeno")
                if (lines[index + 8]?.startsWith("sv")) dayLines.push(lines[index + 8] || "nenalezeno")
            }
        })
        console.log(dayLines)
    }

}