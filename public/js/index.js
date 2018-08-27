console.log("connected to indexjs");
$(document).ready(function () {
  //  get the div where all my data will go
  let postContainer = $(".itemsCards");

  // events for post/comments being saved and deleted
  $(document).on('click', '.bsave', handlePostSave);
  $(document).on('click', '.bscrape', handlePostscrap);

  // next we init the page
  initPage();

  function initPage() {
    console.log("initPage function is working!");
    // clear out the webpage
    postContainer.empty();
    // next run an AJAX request and get any saved post
    $.get('api/post?saved=false').then(function (data) {
      // if data a post was saved  then render it
      if (data && data.length) {
        console.log("there is some data")
        renderPost(data);
      } else {
        // if not then render notting
        console.log("there is no data")
        renderEmpty();
      }
    });
  }

  function renderPost(posts) {
    // this function will handle the appending HTML for the post
    // passing an array of json with all the post in the db
    let postPanels = [];
    posts.forEach(element => {
      postPanels.push(createPanel(element));
      // console.log("this element is being created", element);
    });
    postContainer.append(postPanels);
    console.log("renderPost function is working!");
  }

  function renderEmpty() {
    let emptyAlert =
      $([`<section class="ph3 ph5-ns pv5">
          <article class="mw8 center br2 ba b--light-blue bg-lightest-blue">
    <div class="dt-ns dt--fixed-ns w-100">
      <div class="pa3 pa4-ns dtc-ns v-mid">
        <div>
          <h2 class="fw4 blue mt0 mb3">No new post</h2>
          <p class="black-70 measure lh-copy mv0">
            Would you like to look at new stuff?
          </p>
        </div>
      </div>
      <div class="pa3 pa4-ns dtc-ns v-mid">
        <a class="bscrape no-underline f6 tc db w-100 pv3 bg-animate bg-blue hover-bg-dark-blue white br2">Get New Post</a>
      </div>
      <div class="pa3 pa4-ns dtc-ns v-mid">
        <a href="/saved" class="no-underline f6 tc db w-100 pv3 bg-animate bg-blue hover-bg-dark-blue white br2">Browse Saved Post</a>
      </div>
    </div>
  </article>
        </section>`].join(""));
    postContainer.append(emptyAlert);
    console.log("renderEmpty function is working!");
  }

  function handlePostSave() {
    console.log("attemping to save a post");
    //  this function will trigger when the user wants to save a post
    let postToSave = $(this).parents(".panel").data();
    console.log("postToSave",postToSave);
    postToSave.saved = true;
    // using ajax request, we patch our eisting records inthe collection
    $.ajax({
        method: "PATCH",
        url: `/api/post/${postToSave._id}`,
        data: postToSave
      })
      .then(function (data) {
        console.log('saving a post');
        // if successful then mongoose will send back an object.
        //  this obj will have the key "ok" with the value of 1
        // console.log(data);
        if (data.ok) {
          console.log("handlePortSave function is working!");
          initPage();
        }
      });
  }

  function handlePostscrap() {
    // this will handle when user scraps new data
    $.get("/api/fetch")
      .then(function (data) {
        initPage();
        bootbox.alert("<h3>`data.message`</h3>")
      });
  }

  function createPanel(post) {
    console.log("createPanel function is working!");
    // console.log('creating the paenl with ', post);
    let panel =
      $([`
    <article id="${post._id}" class="panel bg-white mw5 ba b--black-10 mv4">
    <div class="pv2 ph3">
      <h1 class="f6 ttu tracked"></h1>
    </div>
    <img src="${post.image}" class="w-100 db" alt="room image">
    <div class="pa3">
      <h3 href="#" class="link dim lh-title">${post.title}</h3>
      <small class="gray db pv2">By: ${post.author}</small>
      <a class='bsave'><small class="gray db pv2 post-notes">Save Post</small></a>
    </div>
  </article>`].join(""));
  // console.log("post.id here ", post._id);
    panel.data("_id", post._id);
    return panel;
  }
});