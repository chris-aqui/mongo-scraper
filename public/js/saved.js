console.log("connected to savedjs");
$(document).ready(function () {
  //  get the div where all my data will go
  let postContainer = $(".itemsCards");

  // events for post/comments being saved and deleted
  $(document).on('click', '.bdelete', handlePostDelete);
  $(document).on('click', '.bcomment', handlePostComment);
  $(document).on('click', '.bsave', handleCommentSave);
  $(document).on('click', '.bcommentDelete', handleCommentDelete);

  // next we init the page
  initPage();

  function initPage() {
    console.log("initPage function is working!");
    // clear out the webpage
    postContainer.empty();
    // next run an AJAX request and get any saved post
    $.get('/api/post?saved=tru').then(function (data) {
      // if data a post was saved  then render it
      if (data && data.length) {
        console.log("There is some saved data ", data);
        renderPost(data);
      } else {
        // if not then render notting
        console.log("There is no  saved data")
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
    });
    postContainer.append(postPanels);
    console.log("renderPost function is working!");
  }

  function renderEmpty() {
    let emptyAlert =
      $([`
      <section class="ph3 ph5-ns pv5">
    <article class="mw8 center br2 ba b--light-blue bg-lightest-blue">
      <div class="dt-ns dt--fixed-ns w-100">
        <div class="pa3 pa4-ns dtc-ns v-mid">
          <div>
            <h2 class="fw4 blue mt0 mb3">No Saved post</h2>
            <p class="black-70 measure lh-copy mv0">
              What would you like to do?
            </p>
          </div>
        </div>
        <div class="pa3 pa4-ns dtc-ns v-mid">
          <a href="/" class="no-underline f6 tc db w-100 pv3 bg-animate bg-blue hover-bg-dark-blue white br2">Browse New Post</a>
        </div>
      </div>
    </article>
  </section>
      `].join(""));
    postContainer.append(emptyAlert);
    console.log("renderEmpty function is working!");
  }
  //  ////////////////////////////////////////////////////

  function renderCommentsList(data) {
    // rending the comments for the post
    let commentsToRender = [];
    let currentComment;
    console.log("this is data at rending comment list: ", data);
    if (!data.post.length) {
      // if there is no post, just display a message
      currentComment = [
        `<li class='list-group-item'>No comments for this post!</li>
        `
      ].join('');
      commentsToRender.push(currentComment);
    } else {
      for (let i = 0; i < data.post.length; i++) {
        currentComment = $([
          `<li class='list-group-item comment'>
          ${data.post[i].commentText}
          <button class='bcommentDelete'>X</button>
          </li>`
        ].join(""));
        // store the comment id on the delete button
        currentComment.children("button").data("_id", data.post[i]._id);
        commentsToRender.push(currentComment);
      }
    }
    // Now append the commentToRender to the post-container inside the note modal
    $(".post-container").append(commentsToRender);
    console.log("renderCommentsList function is working!");
  }

  function handlePostDelete() {
    //  this will delete post
    let postToDelete = $(this).parents(".panel").data();
    $.ajax({
      method: "DELETE",
      url: `/api/post/${postToDelete}`
    }).then(function (data) {
      if (data.ok) {
        initPage();
      }
    });
    console.log("handlePostDelete function is working!");
  }

  function handlePostComment() {
    // this function handles the comments modal
    // displays the notes
    let currentPost = $(this).parents(".panel").data();
    // grab any post with the id
    $.get(`/api/post/${currentPost._id}`)
      .then(function (data) {
        // modal html
        let modalText = [
          `<form class="pa4 black-80">
        <div>
          <label for="comment" class="f6 b db mb2">Comments for ${currentPost._id}</label>
          <ul class='list-group post-container'></ul>
          <textarea id="comment" name="comment" class="db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2" aria-describedby="comment-desc"></textarea>
          <button class' bsave'>Save Comment</button>
        </div>
      </form>`
        ].join("");
        // make a dialog with the model
        bootbox.dialog({
          message: modalText,
          closeButton: true
        });
        // show comments with the post
        let commentData = {
          _id: currentPost._id,
          comments: data || []
        };
        //
        $(".bsave").data("post", commentData); // check that it is post here
        renderCommentsList(commentData);
      });
    console.log("handlePostComment function is working!");
  }


  function handleCommentSave() {
    //  this function will trigger when the user wants to save a post
    let commentData;
    let newComment = $(".bootbox-body comment").val().trim();
    if (newComment) {
      commentData = {
        _id: $(this).data("post")._id,
        commentText: newComment
      };
      $.post("/api/comments", commentData).then(function () {
        bootbox.hideAll();
      });
    }
    console.log("handleCommentSave function is working!");
  }

  function handleCommentDelete() {
    let commentToDelete = $(this).data("_id");
    $.ajax({
      url: `/api/comments/${commentToDelete}`,
      method: "DELETE"
    }).then(function () {
      bootbox.hideAll();
    });
  }




  // function createPanel(post) {
  //   console.log("createPanel function is working!");
  //   let panel =
  //     $([`
  //     <article id="${post.id}" class="panel bg-white mw5 ba b--black-10 mv4">
  //     <div class="pv2 ph3">
  //       <h1 class="f6 ttu tracked"></h1>
  //     </div>
  //     <img src="${post.image}" class="w-100 db" alt="room image">
  //     <div class="pa3">
  //       <h3 href="#" class="link dim lh-title">${post.title}</h3>
  //       <small class="gray db pv2">${post.author}</small>
  //       <a href="#" class='bdelete'><small class="gray db pv2 post-notes">Delete</small></a>
  //     </div>
  //   </article>`].join(""));
  //   panel.data("_id", post._id);
  //   return panel;
  // }
});