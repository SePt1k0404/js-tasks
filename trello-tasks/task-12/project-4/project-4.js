"use strict";

if (!localStorage.getItem("comments"))
  localStorage.setItem("comments", JSON.stringify([]));

const refs = {
  newCommentForm: document.querySelector(".new-comment-form"),
  commentsList: document.querySelector(".comments-list"),
};

const loadComments = () => {
  const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
  refs.commentsList.innerHTML = "";
  savedComments.forEach((comment) => {
    renderComment(comment, refs.commentsList);
  });
};

const saveComments = () => {
  const comments = Array.from(refs.commentsList.children).map(getCommentData);
  localStorage.setItem("comments", JSON.stringify(comments));
};

const addNewComment = (newComment, time) => {
  const commentHTML = `
      <li class="comment">
        <p>${newComment} <span style="font-size: 13px; color: #555;">(added on ${new Date(
    time
  ).toLocaleString()})</span></p>
        <div class="comment-actions">
          <button class="reply-button">Reply</button>
          <button class="delete-button">Delete</button>
        </div>
        <ul class="nested-comments"></ul>
      </li>
    `;
  refs.commentsList.insertAdjacentHTML("beforeend", commentHTML);
  const comment = refs.commentsList.lastElementChild;
  comment.querySelector(".reply-button").addEventListener("click", () => {
    createReplyForm(comment);
  });
  comment.querySelector(".delete-button").addEventListener("click", () => {
    comment.remove();
    saveComments();
  });

  return comment;
};

const createReplyForm = (parentComment) => {
  if (parentComment.querySelector("form")) return;
  const replyForm = document.createElement("form");
  replyForm.innerHTML = `
      <textarea name="comment" rows="2" required placeholder="Write your reply..."></textarea>
      <button type="submit">Reply</button>
    `;
  replyForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const newComment = replyForm.querySelector("textarea").value.trim();
    if (newComment) {
      const reply = addNewComment(newComment, Date.now());
      parentComment.querySelector(".nested-comments").appendChild(reply);
      replyForm.remove();
      saveComments();
    }
  });
  parentComment.appendChild(replyForm);
};

const renderComment = (data, container) => {
  const comment = document.createElement("li");
  comment.className = "comment";
  comment.innerHTML = `
    <p>${
      data.text
    } <span style="font-size: 13px; color: #555;">(added on ${new Date(
    data.time
  ).toLocaleString()})</span></p>
    <div class="comment-actions">
      <button class="reply-button">Reply</button>
      <button class="delete-button">Delete</button>
    </div>
    <ul class="nested-comments"></ul>
  `;
  container.appendChild(comment);
  comment.querySelector(".reply-button").addEventListener("click", () => {
    createReplyForm(comment);
  });
  comment.querySelector(".delete-button").addEventListener("click", () => {
    comment.remove();
    saveComments();
  });
  data.replies.forEach((reply) =>
    renderComment(reply, comment.querySelector(".nested-comments"))
  );
};

const getCommentData = (comment) => {
  const text = comment.querySelector("p").textContent.split(" (added on")[0];
  const timeString = comment
    .querySelector("p")
    .textContent.match(/\(added on (.+?)\)/)[1];
  const time = new Date(timeString).getTime();
  const replies = Array.from(
    comment.querySelector(".nested-comments").children
  ).map(getCommentData);
  return { text, time, replies };
};

window.addEventListener("load", () => {
  loadComments();
});

refs.newCommentForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const commentText = evt.target.comment.value.trim();
  if (commentText) {
    const newComment = addNewComment(commentText, Date.now());
    refs.commentsList.appendChild(newComment);
    evt.target.comment.value = "";
    saveComments();
  }
});
