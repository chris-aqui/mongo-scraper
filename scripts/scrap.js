const cheerio = require("cheerio");
const axios = require("axios");
const request = require("request");

function trimByWord(sentence) {
  var result = sentence;
  var resultArray = result.split(' ');
  if (resultArray.length > 10) {
    resultArray = resultArray.slice(0, 10);
    result = resultArray.join(' ') + '…';
  }
  return result;
}

const scrape = function (cb) {
  //
  request("https://old.reddit.com/r/RoomPorn/", function (err, res, body) {
    let $ = cheerio.load(body);
    let results = [];

    $("div.thing").each((i, element) => {
      var image = $(element).attr("data-url");
      var author = $(element).attr("data-author").trim();
      var title = $(element).find("p").text().trim();
      // is title, author and image is there then push to array
      if (image && author && title) {
        results.push({
          title: trimByWord(title),
          author: author,
          image: image
        });
      }
    });
    cb(results); // callback function sends us the data scrapeped
    // console.log(results);
  });
  //
  // axios.get("https://old.reddit.com/r/RoomPorn/"
  // ).then(response => {
  //   let results = [];
  //   // console.log(response.data);
  //   // Then, we load that into cheerio and save it to $ for a shorthand selector
  //   const $ = cheerio.load(response.data);
  //   //
  //   $("div.thing").each((i, element) => {
  //     var image = $(element).attr("data-url");
  //     var author = $(element).attr("data-author").trim();
  //     var title = $(element).find("p").text().trim();
  //     // is title, author and image is there then push to array
  //     if (image && author && title) {
  //       results.push({
  //         title: trimByWord(title),
  //         author: author,
  //         image: image
  //       });
  //     }
  //   });
  //   cb(results); // callback function sends us the data scrapeped
  //   console.log(results);
  // })
}

module.exports = scrape;