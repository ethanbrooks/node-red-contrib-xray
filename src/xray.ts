
import { Red, Node, NodeProperties } from 'node-red';
// import { Xray } from 'x-ray';
const Xray = require('x-ray');

interface XrayProps extends NodeProperties {
  url: string;
  cssSelector;
  cssSelectors;
  cssSelectorsType: 'json';
  paginate: string; // Select a url from a selector and visit that page.
  limit: number; // Limit the amount of pagination to n requests.
  abortValidator: any; // Abort pagination if validator function returns true. The validator function receives two arguments:
  // result: The scrape result object for the current page.
  // nextUrl: The URL of the next page to scrape.

  delayFrom: number; // Delay the next request between from and to milliseconds. If only from is specified, delay exactly from milliseconds.
  delayTo: number;
  concurrency: number; // Set the request concurrency to n. Defaults to Infinity.
  throttle: number;// Throttle the requests to n requests per ms milliseconds.
  throttlePerMs: number;
  timeoutMs: number; // Specify a timeout of ms milliseconds for each request.
}
module.exports = function registerNode (RED: Red) {

  function XrayNode (config: XrayProps) {
    let node = this as Node;
    RED.nodes.createNode(node, config);

// ,

//  function XrayNode (node: Node, config: XrayProps) {
//    RED.nodes.createNode(node, config);
//  function XrayNode (config) {
//    RED.nodes.createNode(this,config);
//    let node = this;
    this.on('input', async msg => {
      let xray = Xray();
      let data;
      let stream = xray(config.url, config.cssSelector, JSON.parse(config.cssSelectors))
         //   .delayFrom(config.delayFrom)
   //   .delayTo(config.delayTo) //// Delay the next request between from and to milliseconds. If only from is specified, delay exactly from milliseconds.
   //   .concurrency(config.concurrency) // Set the request concurrency to n. Defaults to Infinity.
   //   .throttle(config.throttle, config.throttlePerMs) // Throttle the requests to n requests per ms milliseconds.
      .paginate(config.paginate)
      .limit(config.limit)
     // .abort(config.abortValidator) // Abort pagination if validator function returns true. The validator function receives two arguments:
/*
     .stream();
      // Handle stream events --> data, end, and error
      stream.on('data', function(chunk) {
        msg.payload = JSON.parse(chunk.toString());
        node.send(msg);
//        data += chunk;
      });

      stream.on('end',function() {
        console.log('data:' + data);
      });

      stream.on('error', function(err) {
        console.log(err.stack);
      });
*/
     .then(function (result) {
//        console.log(result); // prints first result
        msg.payload = result;
        node.send(msg);
      })
      .catch(function (err) {
        console.log(err); // handle error in promise
        node.error(err);
      });

    });
  }
  RED.nodes.registerType('xray', XrayNode);
};
