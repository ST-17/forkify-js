import View from "./View.js";
import icons from "url:../../img/icons.svg"; // Parcel 2

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No recipes found for your query. Please try another one!";
  _message = "";

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    let temp = "";
    this._data.forEach((markup) => {
      temp += `
      <li class="preview">
        <a class="preview__link ${
          markup.id === id ? "preview__link--active" : ""
        }" href="#${markup.id}">
          <figure class="preview__fig">
            <img src="${markup.image}" alt="${markup.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${markup.title}</h4>
            <p class="preview__publisher">${markup.publisher}</p>

            <div class="preview__user-generated ${
              markup.key ? "" : "hidden"
            }">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
      `;
    });
    return temp;
  }
}

export default new ResultsView();
