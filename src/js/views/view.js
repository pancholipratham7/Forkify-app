import icons from '../../img/icons.svg';
export class View {
  _data;
  render(data, render = true) {
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    console.log(this._data);
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const oldElements = Array.from(this._parentEl.querySelectorAll('*'));
    newElements.forEach((newEl, i) => {
      const oldEl = oldElements[i];
      if (
        !newEl.isEqualNode(oldEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        oldEl.textContent = newEl.textContent;
      }
      if (!oldEl.isEqualNode(newEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          oldEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }
  renderSpinner() {
    const html = `<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;
    this._parentEl.innerHTML = '';
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }
  //Method for rendering error Message...!
  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div> `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  //  Method for rendering success message..!
  renderMessage(message = this._message) {
    const markup = `<div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div> `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
