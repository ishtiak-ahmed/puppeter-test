const puppeteer = require('puppeteer');

(async () => {
  // Launch a new browser instance
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Open Google and perform a search
  await page.goto('https://www.google.com');
  await page.waitForSelector('#APjFqb');

  await page.type('#APjFqb', 'top 10 article reading site for software developer');
  await page.keyboard.press('Enter');

  // Wait for the search results to load
  await page.waitForSelector('h3');

  // Extract the search results
  const results = await page.evaluate(() => {
    const items = document.querySelectorAll('h3');
    return Array.from(items).map(item => item.textContent);
  });

  // Log the results
  console.log(results.slice(0, 10)); // Print the top 10 results

  // Close the browser
  await browser.close();
})();
