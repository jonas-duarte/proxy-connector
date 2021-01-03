const puppeteer = require("puppeteer-extra");

const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const path = require("path");

const proxies = require("./proxies.json");

async function openBrowser({ name, ip, username, password }) {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    userDataDir: path.join(__dirname, "browsers", name),
    args: [`--proxy-server=${ip}`],
  });

  const page = (await browser.pages())[0];

  await page.authenticate({ username, password });
}

proxies.forEach((p) => openBrowser(p));
