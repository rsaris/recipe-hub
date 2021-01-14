import jsRoutes from './js_routes.js.erb';

const recipeRoutes = {
  editRecipePath: (id) => `/recipes/${id}/edit`,
  newRecipePath: () => '/recipes/new',
  recipePath: (id) => `/recipes/${id}`,
  recipesPath: () => '/recipes',
};

const userRoutes = {
  accountPath: () => '/account',
};

const routes = {
  ...jsRoutes,
  ...recipeRoutes,
  ...userRoutes,
};

export default routes;
