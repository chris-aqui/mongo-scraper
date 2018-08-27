// get the scrape function from the scripts folder
const scrape = require("../scripts/scrap");
// get the contollers
const articleController = require("../controllers/article");
const commentController = require("../controllers/comment");




module.exports = function (router) {
  // this route renders the index
  router.get("/", function (req, res) {
    res.render("index");
  });

  // this route rnders the saved page
  router.get("/saved", function (req, res) {
    // console.log("Looking at the /saved req: ", req.query);
    res.render("saved");
  });

  //  an api route to "fetch" our data fromt he trageted site
  router.get("/api/fetch", function (req, res) {
    // this is the fetch method define inside the controlers
    articleController.fetch(function (err, docs) {
      if (err) throw err;
      // check if scrape failed or no new content
      if (!docs || docs.insertedCount === 0) {
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
  router.get("/api/post", function (req, res) {
    // console.log(`this is the req in the get method call ${req}`)
    //  query is defined as empty.
    //  if the user does not query anything then we return all the date.
    //  if the user picks a specific post then we return that
    query = {};
    if (req.query.saved) {
      query = req.query;
      console.log(`This is the query inside the routes call to the get method ${query}`);
    }
    // this is the get method defined it the controller
    articleController.get(query, function (data) {
      res.json(data);
    });

  });

  router.delete("/api/post/:id", function (req, res) {
    let query = {};
    query._id = req.params.id;
    articleController.delete(query, function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  router.patch('/api/post', function (req, res) {
    // console.log("req.body in the patcher ", req.params.id);
    // console.log("req.body in the patcher ", req.body);
    // console.log("req.body in the patcher ", req);
    // console.log("*********************" + Object.keys(req));
    // let queryUpdate = req.params.id;
    articleController.update(req.body, function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });


  // on post at that id
  router.get("/api/comments/:article_id", function (req, res) {
    let query = {};
    if (req.params.article_id) {
      query.id = req.params.article_id;
    };
    // get post at that id
    commentController.get(query, function (err, data) {
      if (err) throw err;
      res.json(data);
    })
  })

  // delete post at that id
  router.delete("/api/comments/:id", function (req, res) {
    let query = {};
    query._id = req.params.id;
    commentController.delete(query, function (err, data) {
      if (err) throw err;
      res.json(data);
    })
  })
  // time to post

  router.post("api/post", function (req, res) {
    console.log("posting some data")
    commentController.save(req.body, function (data) {
      res.json(data);
    });
  });


};