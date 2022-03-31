const fs = require('fs');
const puppeteer = require('puppeteer');

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
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);
    const form = await page.evaluate(() => {
        let form = document.querySelector('form').elements;
        const elementsList = [...form].filter(element => element.type !== 'hidden');
        const formFields = elementsList.map((e) => {
            return {
                type: e.type,
                labelName: e.placeholder,
                name: e.name,
                selector: `[name = "${e.name}"]`
            }
        })
        console.log(formFields);
        return formFields;
    });
}

module.exports = {
    accessWebsite
}