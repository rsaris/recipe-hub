import jsRoutes from './js_routes.js.erb';

const routes = {
  ...jsRoutes,
  editRecipePath: (id) => `/recipes/${id}/edit`,
  newRecipePath: () => '/recipes/new',
  recipePath: (id) => `/recipes/${id}`,
  recipesPath: () => '/recipes',
};

export default routes;
