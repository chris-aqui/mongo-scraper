const cheerio = require("cheerio");
const axios = require("axios");

module.exports = function(app){

  app.get("/", function(req, res){
    //
    let results = [];
    axios.get("https://old.reddit.com/r/RoomPorn/").then(response =>{
      // console.log(response.data);
      // Then, we load that into cheerio and save it to $ for a shorthand selector
        const $ = cheerio.load(response.data);
        //
        $("div.thing").each((i, element)=>{
          //
          var image = $(element).attr("data-url");
          var author = $(element).attr("data-author");
          var title = $(element).find("p").text();
          // console.log(title);
          results.push({
            title: title,
            author: author,
            image: image
          });
        });
        console.log(results);
        //
        res.render("index", {
          values: results
        });
    }).catch(function(err) {
      return res.json(err);
    });
//
  });
}