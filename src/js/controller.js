import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

import { MODAL_CLOSE_SEC } from "./config.js";

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  const id = window.location.hash.slice(1);

  if (!id) return;

  try {
    recipeView.renderSpinner();

    // loading resipe
    await model.loadRecipe(id);

    // render resipe
    recipeView.render(model.state.recipe);

    //update search results
    resultsView.update(model.getSearchResultsPage());

    // update bookmarks
    bookmarksView.update(model.state.bookmarks);
  } catch (e) {
    console.error(`${e} 💥`);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    //get search query
    const query = searchView.getQuery();
    if (!query) return;

    //load search results
    await model.loadSearchResult(query);

    //render search results
    resultsView.render(model.getSearchResultsPage());

    //render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (e) {
    console.error(`${e} 💥`);
  }
};

const controlPagination = function (goToPage) {
  //render NEW page results
  resultsView.render(model.getSearchResultsPage(goToPage));

  //render initial pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // update the recipe servings
  model.updateServings(newServings);

  // update the view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // add/delete bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // update the view
  recipeView.update(model.state.recipe);

  //render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmark = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // upload new recipe
    await model.uploadRecipe(newRecipe);

    //render new recipe
    recipeView.render(model.state.recipe);

    //render bookmark
    bookmarksView.render(model.state.bookmarks);

    // success message
    addRecipeView.renderMessage();

    //change id in url
    window.history.pushState(null, "", `#${model.state.recipe.id}`);
    window.history.back();

    //close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    addRecipeView.renderError(error.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmark);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.adddHandlerUpload(controlAddRecipe);
};
init();
