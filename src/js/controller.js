//Any library that you import from import you don't need to specify the path parcel is so smart that it will directly find the path...!
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
import * as model from './model.js';
import viewRecipe from './views/viewRecipe.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import { getSearchResultsPage } from './model.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
import { updateServings } from './model.js';
import bookmarkView from './views/bookmarkView.js';
import {  MODAL_CLOSE } from './config.js';

//Selecting html elements...!
const recipeContainer = document.querySelector('.recipe');

/////////////////////////////////////
//Let's Gooo.....🚀🚀🚀!

const controlServings = function (newServing) {
  updateServings(newServing);
  // viewRecipe.render(model.state.recipe);
  viewRecipe.update(model.state.recipe);
  console.log('Serving Button Clicked');
};

//  Function for controlling bookmarking recipe
const controlBookmark = function () {
  //Delete or add bookmark
  if (!model.state.recipe.bookMarked) model.bookMarkRecipe(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //Update Bookmark
  viewRecipe.update(model.state.recipe);

  //Render bookmark
  bookmarkView.render(model.state.bookmarks);
};

//Function for showing information about a particular recipe using unique ID.....
const controlRecipe = async function () {
  try {
    const id = location.hash.slice(1);
    if (!id) return;
    //Rendering spinner
    viewRecipe.renderSpinner();
    //Loading the recipe
    //Now here bascially here the loadrecipe doesn't return anything so there is no need to store it in a variable...!

    //Rerendering the selected item
    resultsView.update(model.getSearchResultsPage(model.state.search.page));
    await model.loadRecipe(id);
    const { recipe } = model.state;

    //Rendering the recipe...>!
    viewRecipe.render(recipe);

    //Updating Bookmarks...!
    bookmarkView.update(model.state.bookmarks);

  } catch (err) {
    viewRecipe.renderError();
  }
};

const controlAddRecipe=async function(newRecipe){
try{

//Rendering the spinner
addRecipeView.renderSpinner();

//Uploading Recipe
await model.uploadRecipe(newRecipe);

//Rendering the uploaded recipe...!
viewRecipe.render(model.state.recipe);

//Success Message
addRecipeView.renderMessage();

//ReRendering the bookmarks....!
bookmarkView.render(model.state.bookmarks);

//Changing the url of the browser to the newely uploaded recipe
window.history.pushState(null,'',`#${model.state.recipe.id}`);


setTimeout(() => {
  //Removing the modal open window
addRecipeView._toggleWindow();



}, MODAL_CLOSE);



}catch(err){
  addRecipeView.renderError(err);
}}

const controlSearchResults = async function (query) {
  try {
    resultsView.renderSpinner();
    query = searchView.getquery();
    if (!query) return;
    await model.loadSearchResults(query);
    resultsView.render(getSearchResultsPage(model.state.search.page));
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlBookmarkRenderHandler=function(){
  bookmarkView.render(model.state.bookmarks);
}
const controlPagination = function (goToPage) {
  resultsView.render(getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};
const init = function () {
  viewRecipe.eventHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  viewRecipe.addHandlerServings(controlServings);
  viewRecipe.addHandlerBookmark(controlBookmark);
  bookmarkView.addBookmarkHandler(controlBookmarkRenderHandler);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
