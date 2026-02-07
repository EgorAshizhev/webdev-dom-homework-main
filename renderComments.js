import { comments } from "./script.js";
import { commentsList } from "./script.js";
import { renderComment } from "./script.js";
import { commentInput } from "./script.js";
import { nameInput } from "./script.js";
import { quoteBlock, quoteAuthor, quoteText } from "./script.js";
import replyingTo from "./script.js";



// Функция для отрисовки всех комментариев
export const renderComments = () => {
    commentsList.innerHTML = comments.map(renderComment).join("");

    // Обработчики для лайков
    document.querySelectorAll(".like-button").forEach((button) => {
        button.addEventListener("click", (event) => {
            event.stopPropagation();
            const commentElement = event.target.closest(".comment");
            const commentId = parseInt(commentElement.dataset.id);
            const comment = comments.find(c => c.id === commentId);

            if (comment.isLiked) {
                comment.likes--;
                comment.isLiked = false;
            } else {
                comment.likes++;
                comment.isLiked = true;
            }

            renderComments();
        });
    });

    document.querySelectorAll(".comment").forEach((commentElement) => {
        commentElement.addEventListener("click", (event) => {

            if (event.target.closest('[data-action="like"]')) {
                return;
            }
            const commentId = parseInt(commentElement.dataset.id);
            const comment = comments.find(c => c.id === commentId);

            let replyingTo = commentId;


            quoteBlock.style.display = "block";


            quoteAuthor.textContent = comment.name;
            quoteText.textContent = comment.text;

            commentInput.value = `> ${comment.text}\n\n`;
            commentInput.focus();
        });
    });
};
