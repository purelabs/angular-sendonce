/*
 * angular-sendonce
 * http://github.com/purelabs/angular-sendonce
 *
 * Version: 0.1.0 - 2015-05-15
 * License: MIT
 */
angular.module('sendOnce', [])

.factory('sendOnce', function($q) {
    return function(stateHolder, func) {
        stateHolder.sending = !!stateHolder.sending;
        stateHolder.sent = !!stateHolder.sent;

        if (!stateHolder.sending && !stateHolder.sent) {
            stateHolder.sending = true;

            return func().then(
                function() {
                    stateHolder.sending = false;
                    stateHolder.sent = true;
                },
                function() {
                    stateHolder.sending = false;
                    stateHolder.sent = false;
                }
            );
        } else {
            return $q.defer();
        }
    };
})

;
