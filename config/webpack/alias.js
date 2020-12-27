const path = require('path');

module.exports = {
  resolve: {
    alias: {
      common: path.resolve(__dirname, '..', '..', 'app/javascript/common'),
      hooks: path.resolve(__dirname, '..', '..', 'app/javascript/hooks'),
      lib: path.resolve(__dirname, '..', '..', 'app/javascript/lib'),
      recipes: path.resolve(__dirname, '..', '..', 'app/javascript/recipes'),
      styles: path.resolve(__dirname, '..', '..', 'app/javascript/styles'),
    },
  },
};
