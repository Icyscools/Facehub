var textarea = document.querySelector("textarea");
var overlay = document.querySelector("#overlay");

textarea.addEventListener("keydown", autosize);

// Autosize text area
function autosize(ev) {
  var el = this;
  if (ev.key === "Enter" && !ev.shiftKey) {
    sendingPost();
    ev.preventDefault();
  } else {
    setTimeout(function() {
      el.style.cssText = "height:auto; padding:0";
      // for box-sizing other than "content-box" use:
      // el.style.cssText = '-moz-box-sizing:content-box';
      el.style.cssText = "height:" + el.scrollHeight + "px";
    }, 0);
  }
}

// Posts
let posts = [
  {
    date: "27/10/2019, 01:22:00",
    message: "I tried."
  },
  {
    date: "26/10/2019, 00:05:00",
    message: "Alone"
  },
  {
    date: "26/10/2019, 23:55:00",
    message: "feeling blue"
  },
  {
    date: "26/10/2019, 20:11:00",
    message: "Need someone to hug"
  },
  {
    date: "26/10/2019, 19:39:00",
    message: "I'm so alone"
  }
];

function sendingPost() {
  let text = textarea.value;
  if (text !== null && text != "") {
    let date = new Date();
    textarea.value = "";

    // Should I sending my post to firebase?
    // axios({
    //   method: "POST",
    //   url: "your-firebase-link",
    //   data: {
    //     date: `${date.toLocaleString("en-GB")}`,
    //     message: text
    //   }
    // })
    //   .then(res => {
    //     // If success, I should update posts
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    posts.unshift({
      date: `${date.toLocaleString("en-GB")}`,
      message: text
    });
    renderPost();
  }
}

function removePost(index) {
  // Should I remove my post from firebase?
  // axios({
  //   method: "POST",
  //   url: "your-firebase-link",
  //   data: {
  //     date: `${date.toLocaleString("en-GB")}`,
  //     message: text
  //   }
  // })
  //   .then(res => {
  //     // If success, I should update posts
  //     console.log(res);
  //     renderPost();
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  posts.splice(index, 1);
  renderPost();
}

// Rendering post from list
function renderPost() {
  let result_post = document.querySelector("#post-result");
  let template = document.querySelector("#post-template");
  result_post.innerHTML = "";
  for (i in posts) {
    let el = template.cloneNode(true);
    el.querySelector(".card-header > h6").innerText = `${posts[i].date}`;
    el.querySelector(".card-header > .pointer").setAttribute(
      "onclick",
      `removePost(${i})`
    );
    el.querySelector(
      ".card-body > .card-text"
    ).innerText = `${posts[i].message}`;
    el.style.display = "block";
    result_post.appendChild(el);
  }
}

// Event trigger when window load
window.onload = function() {
  // Can we loading post before rendering post ?
  // axios({
  //   method: "GET",
  //   url: "your-firebase-link"
  // })
  //   .then(res => {
  //     // Maybe posts will get here
  //     console.log(res);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });

  this.renderPost();
};
