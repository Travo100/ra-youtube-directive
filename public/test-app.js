(function(){
angular
    .module('myApp', ['ra-youtube'])
    .controller('mainController', mainController);

    function mainController() {
      var vm = this;
      vm.message = "Hello Youtube";
    }
    
})();