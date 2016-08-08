angular.module('demoApp')

.controller('ContactPageCtrl', function($window){
    this.send = function () {
        // Simulate error
        this.errorMsg = true;
        // form data
        console.log('form data: ', this.email, ' - ', this.message);
    };
});
