import { API_URL,KEY } from './config.js';
import { ajax} from './helper.js';
import { RESULTS_PER_PAGE } from './config.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
  bookmarks: [],
};
const createRecipeObject=function(data){
let { recipe } = data.data;
    return {
      id: recipe.id,
      publisher: recipe.publisher,
      servings: recipe.servings,
      ingredients: recipe.ingredients,
      imageUrl: recipe.image_url,
      sourceUrl: recipe.source_url,
      title: recipe.title,
      cookingTime: recipe.cooking_time,
      ...(recipe.key && {key:recipe.key})
    };
}


export const loadRecipe = async function (id) {
  try {
    const data = await ajax(`${API_URL}${id}?key=${KEY}`);
    state.recipe=createRecipeObject(data);
    if (state.bookmarks.some(bookmark => id === bookmark.id)) {
      state.recipe.bookMarked = true;
    } else {
      state.recipe.bookMarked = false;
    }
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await ajax(`${API_URL}?search=${query}&key=${KEY}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        publisher: rec.publisher,
        imageUrl: rec.image_url,
        title: rec.title,
        ...(rec.key && {key:rec.key})

      };
    });
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};
export const updateServings = function (newServing) {
  state.recipe.ingredients.forEach(el => {
    el.quantity = (el.quantity * newServing) / state.recipe.servings;
  });
  state.recipe.servings = newServing;
};

export const getSearchResultsPage = function (page = 1) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = state.search.resultsPerPage * page;
  return state.search.results.slice(start, end);
};

 const persistBookmark=function(){
  localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks));
}

export const bookMarkRecipe = function (recipe) {
  //Adding recipe to bookmarks array
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) {
    state.recipe.bookMarked = true;
  }
  persistBookmark();
};

export const deleteBookmark = function (id) {
  //Deleting Bookmark
  const index = state.bookmarks.findIndex(el => el.id == id);
  state.bookmarks.splice(index, 1);

  if (state.recipe.id === id) state.recipe.bookMarked = false;
  persistBookmark();

};

//Upload Recipe
export const uploadRecipe=async function(newRecipe){
  try{  const ingredients=Object.entries(newRecipe).filter(entry=>entry[0].startsWith("ingredient") && entry[1]!=='').map(ing=>{
    const ingArr=ing[1].split(',').map(el=>el.trim());
    if(ingArr.length!==3) throw new Error("Wrong Ingredient Format,PLease use the correct format...!!");
    const [quantity,unit,description]=ingArr;
    return{
      quantity,
      unit,
      description
    };
  })
    const recipe={
      title:newRecipe.title,
      source_url:newRecipe.sourceUrl,
      image_url:newRecipe.image,
      publisher:newRecipe.publisher,
      cooking_time:+newRecipe.cookingTime,
      servings:+newRecipe.servings,
      ingredients
    }
    // console.log(recipe);
    const data=await ajax(`${API_URL}?key=${KEY}`,recipe);
    console.log(data);
    state.recipe=createRecipeObject(data);
    bookMarkRecipe(state.recipe);
  }
  catch(err){
    throw err;
  }
  }


const init=function(){
  const storage=localStorage.getItem('bookmarks');
  if(storage) state.bookmarks=JSON.parse(storage);
}
init();