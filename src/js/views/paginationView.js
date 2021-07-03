import { View } from './view.js';
import icons from '../../img/icons.svg';
class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const button = e.target.closest('.btn--inline');
      handler(+button.dataset.goto);
    });
  }

  _generateMarkup() {
    //If the page 1 and there are other pages
    const numPage = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const currPage = this._data.page;
    //If the page is 1 and there are other pages
    if (currPage === 1 && numPage > 1) {
      return `<button data-goTo=${
        currPage + 1
      } class="btn--inline pagination__btn--next">
        <span>Page ${currPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }

    //If the page is 1 and there are no other pages
    if (numPage === 1 && currPage === 1) {
      return;
    }

    //If the page is last
    if (currPage === numPage && numPage > 1) {
      return `<button data-goTo=${
        currPage - 1
      } class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currPage - 1}</span>
      </button>`;
    }

    //Any pagein between
    return `<button data-goTo=${
      currPage - 1
    }  class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage - 1}</span>
          </button>
          <button data-goTo=${
            currPage + 1
          } class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
  }
}
export default new PaginationView();
