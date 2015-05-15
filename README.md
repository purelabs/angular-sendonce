# angular-sendonce

    <body ng-controller="PersonController">
        <form name="personForm" ng-submit="submitPersonForm(personForm)">
            <input type="text" name="firstName" ng-model="person.firstName" required>
            <input type="submit" ng-disabled="personForm.sent">
            <span ng-show="personForm.sending">Sending...</span>
        </form>
        <span>Server responses: {{ serverResponses }}</span>
    </body>


    angular.module('app', ['sendOnce'])

    .controller('PersonController', function($scope, $timeout, sendOnce) {
        $scope.person = {};
        $scope.serverResponses = 0;
        $scope.submitPersonForm = function(form) {
            // only required if calculation before sending is heavy...
            //
            // if (form.sending || form.sent) {
            //     return;
            // }

            if (form.$invalid) {
                return;
            }

            // ...
            sendOnce(form, function() {
                return $timeout(function() {
                    $scope.serverResponses++;
                }, 3000);
            });
            // ...
      };
    })

    ;
