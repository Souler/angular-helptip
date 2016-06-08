require('../bower_components/angular')
require('../bower_components/angular-translate')
require('./style/style.less')
require('./index.html')

require('angular')
.module('upp.helptip', [])
.provider('helptipConfig', require('./js/provider'))
.directive('helptip', require('./js/directive'))