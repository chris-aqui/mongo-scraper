module.exports = function (router) {
  // this route renders the index
  router.get("/", function(req, res){
    res.render("index");
  })

  // this route rnders the saved page
  router.get("/saved", function(req,res){
    res.render("saved");
  })
};