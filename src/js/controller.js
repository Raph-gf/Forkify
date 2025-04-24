import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

if (import.meta.hot) {
  import.meta.hot.accept(newModule => {
    if (newModule) {
      console.log('updated');
    } else {
      console.error('Erreur de syntaxe ou autre problème dans le module.');
    }
  });
}

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
    resultsView.render(model.state.search.results);
  } catch (error) {
    resultsView.renderError();
  }
};

const init = () => {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResult);
};
init();
