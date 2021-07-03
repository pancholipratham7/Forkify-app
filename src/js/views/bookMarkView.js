import { View } from './view';
import previewView from './previewView';
class BookmarkView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = `No bookmarks yet find a new recipe and bookmark it...!!!`;

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
  addBookmarkHandler(handler){
    window.addEventListener("load",function(){
        handler();
    })
  }
}
export default new BookmarkView();
