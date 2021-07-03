import icons from '../../img/icons.svg';
import { View } from './view';
class AddRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _btnOpen=document.querySelector(".nav__btn--add-recipe");
  _btnClose=document.querySelector(".btn--close-modal");
 _overlay=document.querySelector(".overlay");
  _window=document.querySelector(".add-recipe-window");
  _message=`Recipe was added successfully....!`;
constructor(){
    super();
this.addRecipeShowWindowHandler();
this.addRecipeHideWindowHandler();
}
addHandlerUpload(handler){
this._parentEl.addEventListener("submit",function(e){
    e.preventDefault();
    const dataArr=[...new FormData(this)];
    const data=Object.fromEntries(dataArr);
    handler(data);
})
}
_toggleWindow(){
      this._window.classList.toggle("hidden");
        this._overlay.classList.toggle("hidden");
}

addRecipeShowWindowHandler(){
    this._btnOpen.addEventListener("click",this._toggleWindow.bind(this));    
}


addRecipeHideWindowHandler(){
this._btnClose.addEventListener("click",this._toggleWindow.bind(this));
this._overlay.addEventListener("click",this._toggleWindow.bind(this));

}


}
export default new AddRecipeView();
