import View from "./View.js";
import icons from "url:../../img/icons.svg"; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
  _generateMarkup() {
    const currentPage = this._data.page;
    const numPage = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // page 1,and there are other pages
    if (currentPage === 1 && numPage > 1) {
      return this._generateMarkupBtnNext(currentPage);
    }

    // last page
    if (currentPage === numPage && numPage > 1) {
      return this._generateMarkupBtnPrev(currentPage);
    }

    // other page
    if (currentPage < numPage) {
      return `
      ${this._generateMarkupBtnPrev(currentPage)}
      ${this._generateMarkupBtnNext(currentPage)}
      `;
    }

    // page 1, and there are NO other pages
    return "";
  }
  _generateMarkupBtnPrev(currentPage) {
    return `
      <button data-goto="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>
      `;
  }
  _generateMarkupBtnNext(currentPage) {
    return `
      <button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
      `;
  }
}

export default new PaginationView();
