// const {Builder, By, Key} = require('selenium-webdriver');
// import { Builder, By, Key } from 'selenium-webdriver'
// import cheerio from 'cheerio';
// // const cheerio = require('cheerio');
// (async function myFunction() {
//     let driver = await new Builder().forBrowser('chrome').build();
//     //your code inside this block
//     await driver.get('https://studentportal.hindustanuniv.ac.in');
//     let inp =  driver.findElement(By.name('username_temp'))
//     await inp.sendKeys('18113075')
//     let pass =  driver.findElement(By.name('password'))
//     await pass.sendKeys('123456', Key.ENTER)
//     let btn =  driver.findElement(By.css('button[onclick="signIn(\'HITS\')"]'))
//     await btn.sendKeys('123456', Key.ENTER)
//     let academics =  driver.findElement(By.css('li[class="dropdown"]:nth-of-type(3) a'))
//     await academics.sendKeys('1', Key.ENTER)
//     let tt = driver.findElement(By.css('a[href="/search/timeTableSetup.htm"]'))
//     await tt.sendKeys('1', Key.ENTER)
//     // Try changing this to sasync later
//     let html = driver.executeScript("return document.documentElement.outerHTML").then(
//         res =>{
//             loadTimeTable(res)
//         }
//     )
// })();


// function loadTimeTable(res){
//     const timeTable = { }
//     let $ = cheerio.load(res)
//     for(let i=2; i<8 ; i++){
//         let arr = [];
//         let day = $('div[id="tableDiv"] tbody tr:nth-of-type('+i+') td:nth-of-type(1)').text()
//         for(j=0;j<9;j++){
//             // let teacherName = $('div[id="tableDiv"] tbody tr:nth-of-type('+i+') td:nth-of-type('+j+') label').text()
//             let subjects =  $('div[id="tableDiv"] tbody tr:nth-of-type('+i+') td:nth-of-type('+j+') span').text()
//             arr.push(subjects)
//         }   
//         timeTable[day] = arr;
//     }
//     console.log(timeTable)
// }