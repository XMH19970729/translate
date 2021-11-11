'use strict';
const puppeteer = require('puppeteer');
const fs = require('fs');
const xlsx = require('node-xlsx');
// const path = require('path');
const Service = require('egg').Service;
class getTranslate extends Service {
    async get() {
        console.log('开始翻译：===>');
        puppeteer.launch({
            headless: true,
            args: [ // 禁用一些功能
                // '--no-sandbox', // 沙盒模式
                // '--disable-setuid-sandbox', // uid沙盒
                // '--disable-dev-shm-usage', // 创建临时文件共享内存
                // '--disable-accelerated-2d-canvas', // canvas渲染
                // '--disable-gpu' // GPU硬件加速
                '--start-maximized',

            ],
            defaultViewport: {
                width: 1728,
                height: 978,
            },
            ignoreDefaultArgs: ['--enable-automation'],
        }).then(async browser => {
            const page = await browser.newPage();
            const baseLanguage = 'de';
            const translateLanguage = 'zh-CN';
            const url = `https://translate.google.cn/?sl=${baseLanguage}&tl=${translateLanguage}`;
            await page.goto(url);

            // 解析得到文档中的所有 sheet
            const sheets = xlsx.parse(fs.readFileSync('C:\\Users\\xmh9269\\Desktop\\13.xls'));
            const needTranslateData = [];
            for (let i = 0; i < sheets[0].data.length; i++) {
                needTranslateData.push(sheets[0].data[i][3]);
            }
            const element1 = '#yDmH0d > c-wiz > div > div.WFnNle > c-wiz > div.OlSOob > c-wiz > div.ccvoYb > div.AxqVh > div.OPPzxe > c-wiz.rm1UF.UnxENd > span > span > div > textarea';
            const element2 = '#yDmH0d > c-wiz > div > div.WFnNle > c-wiz > div.OlSOob > c-wiz > div.ccvoYb > div.AxqVh > div.OPPzxe > c-wiz.P6w8m.BDJ8fb > div.dePhmb > div > div.J0lOec > span.VIiyi > span > span';
            for (let h = 0; h < needTranslateData.length;) {
                const a = Date.now();
                for (let hh = h; hh < h + 100 && hh < needTranslateData.length; hh++) {
                    const baseTranslateData = needTranslateData[hh];
                    await page.waitForSelector(element1);
                    await page.type(element1, baseTranslateData + ' , ');
                }
                h = h + 100;
                const b = Date.now();
                console.log('抓取时间==>', (b - a) / 1000);
                await page.waitForTimeout(10000);
                await page.waitForSelector(element2);
                const translateData = await page.$$eval(element2, el => el.map(el => {
                    return el.innerText;
                }));
                console.log('c====>', translateData);
                await page.goto(url);
                // await page.focus('#yDmH0d > c-wiz > div > div.WFnNle > c-wiz > div.OlSOob > c-wiz > div.ccvoYb > div.AxqVh > div.OPPzxe > c-wiz.rm1UF.UnxENd > span > span > div > textarea');
                // // await this.keyboard.press('Space');
                // // await this.keyboard.press('Backspace');
                // for (let j = 0; j < baseTranslateData; j++){
                //     await page.keyboard.press('Backspace');
                // }
                await page.waitForTimeout(2000);
            }

            // await page.waitForTimeout(100000);
            await browser.close();
        }).then(() => {
        });
        return true;
    }
}
module.exports = getTranslate;
