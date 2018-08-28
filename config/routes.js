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
    res.render("saved");
  });

  //  an api route to "fetch" our data fromt he trageted site
  router.get("/api/fetch", function (req, res) {
    // this is the fetch method define inside the controlers
    articleController.fetch(function (err, docs) {
      if (err) throw ("Error on router FETCH ",err);
      // check if scrape failed or no new content
      if (!docs || docs.insertedCount === 0) {
        res.json({
          message: "Sorry mate, No new post Today. Check back later"
        });
      } else {
        res.json({
          message: `Added ${docs.insertedCount} new posts.`
        });
      }
    });
  });

  // get all the post in the db
  router.get("/api/post", function (req, res) {
    // console.log(`this is the req in the get method call ${req}`)
    let query = {};
    if (req.query.saved) {
      query = req.query;
      console.log(`This is the query inside the routes call to the get method`,query);
    }
    // this is the get method defined it the controller
    articleController.get(query, function (data) {
      // console.log(data);
      res.json(data);
    });
  });

  router.delete("/api/post/:id", function (req, res) {
    let query = {};
    query._id = req.params.id;
    articleController.delete(query, function (err, data) {
      if (err) throw ("Error on the router DELETE ",err);
      res.json(data);
    });
  });

  // router.patch('/api/post', function (req, res) {
  //   console.log("queryUpdate: ", req.body);
  //   articleController.update(req.body, function (err, data) {
  //     res.json(data);
  //   });
  // });

  router.put('/api/post/:id', function (req, res) {
    let queryUpdate = req.params.id;
    let bodyData = req.body;
    console.log("queryUpdate: ", queryUpdate);
    console.log("bodyData: ", bodyData);
    // console.log("queryUpdate: ", queryUpdate);
    articleController.update({_id: queryUpdate}, function (err, data) {
      // if (err) throw err;
      res.status(200).json(data);
    });
  });


  // on post at that id
  router.get("/api/comments/:article_id", function (req, res) {
    let query = {};
    if (req.params.article_id) {
      query._id = req.params.article_id;
    };
    // get post at that id
    commentController.get(query, function (err, data) {
      // if (err) throw ("Error on the router GET comments",err);
      res.json(data);
    })
  })

  // delete post at that id
  router.delete("/api/comments/:id", function (req, res) {
    let query = {};
    query._id = req.params.id;
    commentController.delete(query, function (err, data) {
      // if (err) throw err;
      res.json(data);
    })
  })
  // time to post

  router.post("/api/comments", function (req, res) {
    console.log("posting some data")
    console.log("post req.body ", req.body);
    commentController.save(req.body, function (data) {
      res.json(data);
    });
  });

};


// console.log("req.body in the patcher ", req.params.id);
// console.log("req.body in the patcher ", req.body);
// console.log("req.body in the patcher ", req);
// console.log("*********************" + Object.keys(req));