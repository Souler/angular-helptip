var angular = require('angular')

var HelptipDirective = function($document, $injector, $timeout, helptipConfig) {
    return {
        restrict: 'A',
        scope: {
            message: '@helptip',
            translate: '@?helptipTranslate',
            timeout: '@?helptipTimeout'
        },
        link: function(scope, element) {

            if (!scope.message)
                return

            var dom = document.querySelector('.' + helptipConfig.className())

            if (dom == null) {
                dom = angular.element('<div>')
                    .addClass('helptip')
                    .css('position', 'fixed')
                    .css('top', 0)
                    .css('left', 0)
                    .css('visibility', 'hidden')
                    .css('pointer-events', 'none')
                    .css('z-index', 9999)

                $document.find('body').append(dom)
            } else
                dom = angular.element(dom)

            var leaveTimeout = null

            var message = null
            var updateMessage = function() {
                var message = scope.message
                var useTranslate = !(scope.translate === false || scope.translate === 'false')

                if (useTranslate && helptipConfig.useTranslate() && $injector.has('$translate'))
                    message = $injector.get('$translate').instant(message)

                if (message && message.length > 0)
                    return message
                else
                    return null
            }

            var create = function() {

                if (leaveTimeout != null) {
                    $timeout.cancel(leaveTimeout)
                    leaveTimeout = null
                }

                message = updateMessage()
                dom.html(message)
            }

            var update = function(e) {
                if (message == null)
                    return

                var xStart = e.clientX
                var xLength = dom[0].offsetWidth
                var xEnd = e.clientX + xLength
                var xMax = window.innerWidth
                var yStart = e.clientY
                var yLength = dom[0].offsetHeight
                var yEnd = e.clientY + yLength
                var yMax = window.innerHeight

                // Default behaviour (not near limits)
                var x = xStart
                var y = yStart

                if (xEnd >= xMax)
                    x = xStart - xLength

                if (yEnd >= yMax)
                    y = yStart - yLength

                dom.toggleClass('top', yEnd >= yMax)
                dom.toggleClass('bottom', yEnd < yMax)
                dom.toggleClass('left', xEnd >= xMax)
                dom.toggleClass('right', xEnd < xMax)

                dom.css('left', x + 'px')
                    .css('top', y + 'px')
                    .css('visibility', 'visible')
            }

            var remove = function() {
                if (scope.timeout !== undefined) {
                    var timeout = Number(scope.timeout)
                    if (timeout <= 0)
                        timeout = helptipConfig.timeout()
                    leaveTimeout = $timeout(function() {
                        dom.css('visibility', 'hidden')
                            .css('top', 0)
                            .css('left', 0)
                        leaveTimeout = null
                    }, timeout)
                } else {
                    dom.css('visibility', 'hidden')
                        .css('top', 0)
                        .css('left', 0)
                }
            }

            element
            .on('mouseenter', create)
            .on('mousemove', update)
            .on('mouseleave', remove)
            .bind('$destroy', remove)
        }
    }
}

HelptipDirective.$inject = ["$document", "$injector", "$timeout", "helptipConfig"]

module.exports = HelptipDirective