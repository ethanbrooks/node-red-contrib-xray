var Xray = require('x-ray')
var xray = Xray()


var config =
{
  url: 'https://blog.ycombinator.com/',
  cssSelector: '.post',
  cssSelectors: [
    {
      title: 'h1 a',
      link: '.article-title@href',
      new: {
        date: 'div:nth-child(3) > div > span',
        tag: 'div:nth-child(3) > div > div > ul > li > a'
      }
    }
  ],
  paginate: '.nav-previous a@href',
  limit: 10, // Limit the amount of pagination to n requests.
  abortValidator:null, // Abort pagination if validator function returns true. The validator function receives two arguments:
  delayFrom:null,
  delayTo:null, // Delay the next request between from and to milliseconds. If only from is specified, delay exactly from milliseconds.
  concurrency:null, // Set the request concurrency to n. Defaults to Infinity.
  throttle:null,
  throttlePerMs:null, // Throttle the requests to n requests per ms milliseconds.
  timeoutMs:null,
  paginate:null, // Select a url from a selector and visit that page.
  limit:null, // Limit the amount of pagination to n requests.
  abortValidator:null, // Abort pagination if validator function returns true. The validator function receives two arguments:
  delayFrom:null,
  delayTo:null, // Delay the next request between from and to milliseconds. If only from is specified, delay exactly from milliseconds.
  concurrency:null, // Set the request concurrency to n. Defaults to Infinity.
  throttle:null,
  throttlePerMs:null
}; // Throttle the requests to n requests per ms milliseconds.

xray(config.url, config.cssSelector, config.cssSelectors)
.paginate(config.paginate)
.limit(config.limit)
.then(function (res) {
  console.log(res); // prints first result
})
.catch(function (err) {
  console.log(err); // handle error in promise
});
