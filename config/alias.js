// This SystemJS fake config allows to web storm resolve aliases that are used from webpack

const helpers = require('./helpers');

System.config({
  src: helpers.root('src'),
  core: helpers.root('src/core'),
  ng2: helpers.root('src/ng2'),
  theme: helpers.root('src/themes/dist'),
  assets: helpers.root('src/assets')
});