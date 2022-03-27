const fs = require('fs');
const Crawler = require('crawler');
const puppeteer = require('puppeteer');

const fetch = async (url) => {
    const crawler = new Crawler({
        maxConnections: 10,
        callback: async (error, res, done) => {
            if (error) {
                console.log(error);
            }
            const form = res.$('form');
            if (form.length) {
                const json = await generateFormJson(form)
                await saveJsonFile(res.client._host, json)
            }
            done();
        }
    })
    return await crawler.queue(url);
}

const generateFormJson = async (form) => {
    const formSelector = `[name = "${form.attr().name}"]`;
    const inputs = form.find('[name]');
    const submit = `[class = "${form.find('[type="submit"]').attr().class}"]`;
    const fields = [];
    for (let index = 0; index < inputs.length; index++) {
        if (inputs[index].attribs.type !== 'hidden') {
            fields.push({
                type: inputs[index].attribs.type,
                labelName: inputs[index].attribs.placeholder,
                name: inputs[index].attribs.name,
                selector: `[name = "${inputs[index].attribs.name}"]`
            });
        }
    }
    const json = JSON.stringify([{ fields, submit, formSelector }]);
    return json;
};

const saveJsonFile = async (filename, json) => {
    await fs.writeFileSync(`${filename}.json`, json)
}

const searchForm = async () => {

}

const accessWebsite = async (url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const form = await page.$('form', handleForm(e));
    return formFields;
}

const handleForm = async (e) => {
    let form = document.querySelector('form').elements;
    const elementsList = [...form].filter((e) => {
        return e.attributes.type !== 'hidden'
    })
    return elementsList;
}

module.exports = {
    fetch,
    accessWebsite
}