import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

// if (import.meta.hot) {
//   import.meta.hot.accept(newModule => {
//     if (newModule) {
//       console.log('updated');
//     } else {
//       console.error('Erreur de syntaxe ou autre problème dans le module.');
//     }
//   });
// }

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1 Loading recipe
    await model.loadRecipe(id);

    // 2 Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResult = async () => {
  try {
    resultsView.renderSpinner();
    // get search query
    const query = searchView.getQuery();

    if (!query) return;

    // load search query results
    await model.loadSearchResults(query);

    // Render results
    resultsView.render(model.getSearchResultsPage());

    // Render intial pagination button;
    paginationView.render(model.state.search);
  } catch (error) {
    resultsView.renderError();
  }
};

const controlPagination = goToPage => {
  // Render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Render new pagination button;
  paginationView.render(model.state.search);
};

const controlServings = () => {
  // Update the recipe servings (in state)
  model.updatedServings(8);

  // Update the recipe view
  recipeView.render(model.state.recipe);
};

const init = () => {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
  controlServings();
};
init();
