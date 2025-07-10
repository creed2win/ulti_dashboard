'use server'

import { JSDOM } from 'jsdom';
import sharp from 'sharp';
import Tesseract from 'tesseract.js';
import { createWorker } from 'tesseract.js';

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
        const worker = await createWorker('ces');
        console.log('created worker for CES OCR')
        const ret = await worker.recognize('adjustedMenu.jpeg');
        console.log('got data from OCR')
        console.log(ret.data.text);
        await worker.terminate();
    }




}

