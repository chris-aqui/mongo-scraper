// get the scrape function from the scripts folder
import scrape from "../scripts/scrap";
// get the contollers
const articleController = require("../controllers/article");
const commentController = require("../controllers/comment");




export default function (router) {
  // this route renders the index
  router.get("/", function(req, res){
    res.render("index");
  });

  // this route rnders the saved page
  router.get("/saved", function(req,res){
    res.render("saved");
  });

//  an api route to "fetch" our data fromt he trageted site
router.get("/api/fetch", function(req,res){
  // this is the fetch method define inside the controlers
  articleController.fetch(function(err,docs){
    // check if scrape failed or no new content
    if(!docs || docs.insertedCount ===0 ){
      res.json({
        message: "Sorry mate, no new post Today. Check back later"
      });
    } else {
      res.json({
        message: `Added ${docs.insertedCount} new posts.`
      });
    }
  });
});

// take the user request
router.get("/api/post", function (req,res) {
  //  query is defined as empty.
  //  if the user does not uery anything then we retuen all the date.
  const query = {};
  //  if theuser picks a specifie post then we returen that
  if( req.query.saved){
    query = req.query;
  }
  // this is the get method defined it the controller
  articleController.get(query, function(data){
    res.json(data);
  });

});

router.delete("/api/delete/:id", function (req, res) {
  const query = {};
  query._id = req.params.id;
  articleController.delete(query, function(err, data){
    res.json(data);
  })
})

};