const path = require('path');

module.exports = {
  resolve: {
    alias: {
      components: path.resolve(__dirname, '..', '..', 'app/javascript/components'),
      lib: path.resolve(__dirname, '..', '..', 'app/javascript/lib'),
      styles: path.resolve(__dirname, '..', '..', 'app/javascript/styles'),
    },
  },
};
