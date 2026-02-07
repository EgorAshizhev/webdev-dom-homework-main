"use strict";

export const nameInput = document.querySelector(".add-form-name");
export const commentInput = document.querySelector(".add-form-text");
export const addButton = document.querySelector(".add-form-button");
export const commentsList = document.querySelector(".comments");
export const quoteBlock = document.querySelector(".quote-block");
export const quoteAuthor = document.querySelector(".quote-author");
export const quoteText = document.querySelector(".quote-text");

export let comments = [
  {
    id: 1,
    name: "Глеб Фокин",
    date: "12.02.22 12:18",
    text: "Это будет первый комментарий на этой странице",
    likes: 3,
    isLiked: false,
  },
  {
    id: 2,
    name: "Варвара Н.",
    date: "13.02.22 19:22",
    text: "Мне нравится как оформлена эта страница! ❤",
    likes: 75,
    isLiked: false,
  },
];


let replyingTo = null;
export default replyingTo;
// Функция для экранирования HTML
export const escapeHtml = (text) => {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
};


// Функция для отрисовки одного комментария
export const renderComment = (comment) => {
  return `
    <li class="comment" data-id="${comment.id}">
      <div class="comment-header">
        <div>${comment.name}</div> <!-- Убрали escapeHtml() -->
        <div>${comment.date}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${comment.text} <!-- Убрали escapeHtml() -->
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button class="like-button ${comment.isLiked ? "-active-like" : ""}" data-action="like"></button>
        </div>
      </div>
    </li>
  `;
};

// Функция для отрисовки всех комментариев


addButton.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const text = commentInput.value.trim();

  if (!name || !text) {
    alert("Пожалуйста, заполните все поля");
    return;
  }

  const newComment = {
    id: Date.now(),
    name: escapeHtml(name),
    date: new Date().toLocaleString(),
    text: escapeHtml(text),
    likes: 0,
    isLiked: false,
  };

  comments.push(newComment);
  renderComments();

  nameInput.value = "";
  commentInput.value = "";
  quoteBlock.style.display = "none";
  replyingTo = null;
});

comments = comments.map(comment => ({
  ...comment,
  name: escapeHtml(comment.name),
  text: escapeHtml(comment.text)
}));

renderComments();