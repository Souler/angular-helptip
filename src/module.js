const HelptipConfig = require('./module/helptip-config.provider');
const Helptip = require('./module/helptip.directive');

require('angular')
    .module('upp.helptip', [])
    .provider('helptipConfig', HelptipConfig)
    .directive('helptip', Helptip);