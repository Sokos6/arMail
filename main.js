angular.module("MailboxApp", ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/inbox");
    $stateProvider.state("inbox", {
        url: "/inbox",
        templateUrl: "partials/inbox.html",
        controller: function($scope, messageStore) {
            // console.log("Inbox.")
            $scope.messages = messageStore.getMessages();
        }
    })
        .state('message', {
            url: "/message/:id",
            templateUrl: "partials/message.html",
            controller: function($scope, messageStore, $stateParams) {
                $scope.message = messageStore.getMessages()
                    .filter(function(message) {
                        return message.id == $stateParams.id;
                    })[0];
            }
        })
})
.service("messageStore", function() {
    var messages = [];
    var sampleSize =100;
    for (var i = 0; i < sampleSize; i++) {
        messages.push( {
            sender:"john.smith" + i + "@gmail.com",
            date: Date.now() - i * 2400000000,
            id: i,
            subject: "Regarding report #" + i,
            body: "Hey Will. Where's the report #" + i + "?"
        })
    }
    return {
        getMessages: function() {
            return messages;
        }
    }
});