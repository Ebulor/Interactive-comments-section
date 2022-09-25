fetch("data.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    createComments(data);
  })
  .catch(function (err) {
    console.log(err);
  });
const container = document.querySelector(".container");
const commentContainer = document.querySelector(".comment-container");
let mainContainer = [];
let mainAppend = [];
function createComments(data) {
  for (let i = 0; i < data.length; i++) {
    for (let k = 0; k < data[i].comments.length; k++) {
      let div = document.createElement("div");
      div.classList.add("comment-wrapper");
      let comment_card = `<div class="comment-card">
              <div class="score">
                <div class="score-btn">
                  <img src="images/icon-plus.svg" class="increase" alt="plus sign">
                </div>
                <div class="score-num">
                  ${data[i].comments[k].score}
                </div>
                <div class="score-btn">
                  <img  src="images/icon-minus.svg" class="decrease" alt="minus sign">
                </div>
              </div>
              <div class="content">
                <p class="text">${data[i].comments[k].content}</p>
                <div class="profile-info">
                  <img src="${data[i].comments[k].user.image}" class="profile-img" alt="user image">
                  <p class="username">${data[i].comments[k].user.username}</p>
                  <p class="time-posted">${data[i].comments[k].createdAt}</p>
                  <div class="btns">
                    <button class="reply-btn main-reply-btn">Reply</button>
                  </div>              
            </div>
          </div>
          </div>`;

      let repliesContainer = document.createElement("div");
      repliesContainer.classList.add("replies-container");

      let mainUserBtn = "";
      let userTag = `<p class="user-tag" style="display: block;">you</p>`;
      for (let j = 0; j < data[i].comments[k].replies.length; j++) {
        if (data[i].comments[k].replies[j].user.username === "juliusomo") {
          mainUserBtn = `<div class="btns">
                <button class="delete-btn">Delete</button>
                <button class="edit-btn">Edit</button>
              </div>`;
        } else {
          mainUserBtn = ` <div class="btns">
              <button class="reply-btn sub-reply-btn">Reply</button>
            </div>`;
        }
        let replies = `<div class="replies">
                <div class="score">
                  <div class="score-btn">
                    <img src="images/icon-plus.svg" class="increase" alt="plus sign">
                  </div>
                  <div class="score-num">
                    ${data[i].comments[k].replies[j].score}
                  </div>
                  <div class="score-btn">
                    <img src="images/icon-minus.svg" class="decrease" alt="minus sign">
                  </div>
                </div>
                <div class="content">
                  <div class="profile-info">
                    <img src="${
                      data[i].comments[k].replies[j].user.image
                    }" class="profile-img" alt="user image">
                    <p class="username">${
                      data[i].comments[k].replies[j].user.username
                    }</p>
                    ${
                      data[i].comments[k].replies[j].user.username ===
                      "juliusomo"
                        ? userTag
                        : ""
                    }
                    <p class="time-posted">${
                      data[i].comments[k].replies[j].createdAt
                    }</p>
                    ${mainUserBtn}
                  </div>
                <div class="text">
                  <div class="comment-box-text">
                    <span class="username-tag">@${
                      data[i].comments[k].replies[j].replyingTo
                    }</span>
                    <span>${data[i].comments[k].replies[j].content}</span>
                  </div> 
                  ${
                    data[i].comments[k].replies[j].user.username === "juliusomo"
                      ? `<textarea style="display:none;"></textarea>`
                      : ""
                  }
                </div> 
                <button class="update-btn">Update</button>
            </div>`;
        repliesContainer.innerHTML += replies;
      }

      div.innerHTML += comment_card;
      div.append(repliesContainer);
      commentContainer.append(div);
    }

    const mainReply = document.querySelectorAll(".main-reply-btn");
    mainReply.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        mainAppend = e.path[4].nextSibling;
        replyingComments(e);
      });
    });
  }
  const subReply = document.querySelectorAll(".sub-reply-btn");
  subReply.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      mainAppend = e.path[5];
      replyingComments(e);
    });
  });

  const editBtn = document.querySelectorAll(".edit-btn");
  editBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let textArea = e.path[3].childNodes[3].childNodes[3];
      let commentReplyText =
        e.path[3].childNodes[3].childNodes[1].childNodes[3];
      textArea.value = commentReplyText.textContent;
      commentReplyText.textContent = textArea.value;
      editReply(e);
    });
  });
  const updateBtn = document.querySelectorAll(".update-btn");
  updateBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      updateComment(e);
    });
  });
  const deleteBtn = document.querySelectorAll(".delete-btn");
  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      deleteComment(e);
    });
  });

  const scoreIncrease = document.querySelectorAll(".increase");
  scoreIncrease.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      increaseScore(e);
    });
  });
  const scoreDecrease = document.querySelectorAll(".decrease");
  scoreDecrease.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      decreaseScore(e);
    });
  });
}

//createComments();
function mainUser() {
  let div = document.createElement("div");
  div.classList.add("current-user");
  let mainUser = `
      <img src="./images/avatars/image-juliusomo.png" class="profile-img" alt="white male headshot">
      <textarea placeholder="Add a comment..."></textarea>
      <button class="send-comment">Send</button>`;
  div.innerHTML += mainUser;
  container.append(div);
  let textarea = document.querySelector(".current-user textarea");

  const sendComment = document.querySelector(".send-comment");
  sendComment.addEventListener("click", () => {
    if (textarea.value === "") {
      return;
    } else {
      let div = document.createElement("div");
      div.classList.add("user-comment", "replies");
      let comment = `        
            <div class="score">
              <div class="score-btn">
                <img src="images/icon-plus.svg" class="increase" alt="plus sign">
              </div>
              <div class="score-num">
                0
              </div>
              <div class="score-btn">
                <img src="images/icon-minus.svg" class="decrease" alt="minus sign">
              </div>
            </div>
            <div class="content">
              <div class="profile-info">
                <img src="./images/avatars/image-juliusomo.png" class="profile-img" alt="white male headshot">
                <p class="username">juliusomo</p>
                <p class="user-tag">you</p>
                <p class="time-posted">Today</p>
                <div class="btns">
                  <button class="delete-btn">Delete</button>
                  <button class="edit-btn">Edit</button>
                </div>
              </div>
              <div class="comment-box">  
                <div class="comment-text">                 
                  <span>${textarea.value}</span>
                </div>
                  <textarea style="display:none;"></textarea>
                </div>
                <button class="update-btn">Update</button>
            </div>`;
      div.innerHTML += comment;
      commentContainer.append(div);
    }
    textarea.value = "";
    const editBtn = document.querySelectorAll(".edit-btn");
    editBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let span = e.path[3].childNodes[3].childNodes[1].childNodes[1];
        let commentReply = e.path[3].childNodes[3].childNodes[1];
        let innertextarea = e.path[3].childNodes[3].childNodes[3];
        innertextarea.value = span.textContent;
        e.path[4].classList.add("editable");
        commentReply.style.display = "none";
        innertextarea.style.display = "block";
      });
    });
    const updateBtn = document.querySelectorAll(".update-btn");
    updateBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let commentReply = e.path[1].childNodes[3].childNodes[1];
        let innertextarea = e.path[1].childNodes[3].childNodes[3];
        let span = e.path[1].childNodes[3].childNodes[1].childNodes[1];
        span.textContent = innertextarea.value;
        commentReply.style.display = "block";
        innertextarea.style.display = "none";
        e.path[2].classList.remove("editable");
      });
    });
    const deleteBtn = document.querySelectorAll(".delete-btn");
    deleteBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        deleteComment(e);
      });
    });
    const scoreIncrease = document.querySelectorAll(".increase");
    scoreIncrease.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        increaseScore(e);
      });
    });
    const scoreDecrease = document.querySelectorAll(".decrease");
    scoreDecrease.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        decreaseScore(e);
      });
    });
  });
}
mainUser();

function replyingComments(e) {
  let mainUserReply = document.createElement("div");
  mainUserReply.classList.add("main-user-reply", "replies");
  let userName = e.path[2].childNodes[3].textContent;
  let replying = `        
            <div class="score">
              <div class="score-btn">
                <img src="images/icon-plus.svg" class="increase" alt="plus sign">
              </div>
              <div class="score-num">
                0
              </div>
              <div class="score-btn">
                <img src="images/icon-minus.svg" class="decrease" alt="minus sign">
              </div>
            </div>
            <div class="content">
              <div class="profile-info">
                <img src="./images/avatars/image-juliusomo.png" class="profile-img" alt="white male headshot">
                <p class="username">juliusomo</p>
                <p class="user-tag">you</p>
                <p class="time-posted">Today</p>
                <div class="btns">
                  <button class="delete-btn">Delete</button>
                  <button class="edit-btn">Edit</button>
                  <button class="send-btn">Reply</button>
                </div>
              </div>
              <div class="comment-box">  
                <div class="comment-text" style="display:none;">
                  <span class="username-tag">@${userName}</span>
                  <span></span>
                </div>
                  <textarea></textarea>
                </div>
                <button class="update-btn">Update</button>
            </div>`;
  mainUserReply.innerHTML += replying;
  mainContainer = e.path[4];

  mainContainer.insertAdjacentElement("afterend", mainUserReply);

  const sendReply = document.querySelectorAll(".send-btn");
  sendReply.forEach((sendBtn) => {
    sendBtn.addEventListener("click", (e) => {
      let span = e.path[3].childNodes[3].childNodes[1].childNodes[3];
      let commentReply = e.path[3].childNodes[3].childNodes[1];
      let textarea = e.path[3].childNodes[3].childNodes[3];

      if (textarea.value === "") {
        return;
      } else {
        mainAppend.append(mainUserReply);
        span.textContent = textarea.value;
        commentReply.style.display = "block";
        textarea.style.display = "none";
        sendBtn.parentElement.parentElement.parentElement.parentElement.classList.remove(
          "main-user-reply"
        );
        sendBtn.parentElement.parentElement.parentElement.parentElement.classList.add(
          "replied-comment"
        );
      }
    });
  });

  const editBtn = document.querySelectorAll(".edit-btn");
  editBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      editReply(e);
    });
  });
  const updateBtn = document.querySelectorAll(".update-btn");
  updateBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      updateComment(e);
    });
  });
  const deleteBtn = document.querySelectorAll(".delete-btn");
  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      deleteComment(e);
    });
  });
  const scoreIncrease = document.querySelectorAll(".increase");
  scoreIncrease.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      increaseScore(e);
    });
  });
  const scoreDecrease = document.querySelectorAll(".decrease");
  scoreDecrease.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      decreaseScore(e);
    });
  });
}

const warning = document.querySelector(".warning-container");
const confirmDelete = document.querySelector(".confirm-delete");
const cancelDelete = document.querySelector(".cancel-delete");

function editReply(e) {
  let commentReply = e.path[3].childNodes[3].childNodes[1];
  let textarea = e.path[3].childNodes[3].childNodes[3];
  e.path[4].classList.add("editable");
  commentReply.style.display = "none";
  textarea.style.display = "block";
}

function updateComment(e) {
  let commentReply = e.path[1].childNodes[3].childNodes[1];
  let textarea = e.path[1].childNodes[3].childNodes[3];
  let span = e.path[1].childNodes[3].childNodes[1].childNodes[3];

  if (textarea.value === "") {
    return;
  } else {
    span.textContent = textarea.value;
    commentReply.style.display = "block";
    textarea.style.display = "none";
    e.path[2].classList.remove("editable");
  }
}

function deleteComment(e) {
  let element = e.path[4];
  warning.style.display = "flex";
  confirmDelete.addEventListener("click", () => {
    warning.style.display = "none";
    element.parentElement.removeChild(element);
  });
  cancelDelete.addEventListener("click", () => {
    warning.style.display = "none";
  });
}

function increaseScore(e) {
  let scorenum = e.path[2].childNodes[3].textContent;
  let num = e.path[2].childNodes[3];
  let scorenumval = parseInt(scorenum, 10);
  num.innerHTML = scorenumval + 1;
  e.path[0].style.pointerEvents = "none";
  e.path[2].childNodes[5].childNodes[1].style.pointerEvents = "auto";
}
function decreaseScore(e) {
  let scorenum = e.path[2].childNodes[3].textContent;
  let num = e.path[2].childNodes[3];
  let scorenumval = parseInt(scorenum, 10);
  if (scorenumval === 0) {
    return;
  } else {
    num.innerHTML = scorenumval - 1;
    e.path[2].childNodes[1].childNodes[1].style.pointerEvents = "auto";
    e.path[0].style.pointerEvents = "none";
  }
}
