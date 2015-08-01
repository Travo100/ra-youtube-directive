(function() {
  angular.module('ra-youtube')
  .directive('raYoutubeDirective', raYoutubeDirective);

  function raYoutubeDirective() {
    var directive = {
      templateUrl: 'youtube-template.html',
      restrict: 'EA',
      controller: youtubeController,
      scope: {
        videoId : "@",
        clickMe : "&"
      },

      controllerAs: 'youtubeCtrl',
      bindToController: true,
      transclude: true
    };
    return directive;
  }

  function youtubeController() {
    var vm = this;
    vm.message = "Yup";
    vm.showModal = false;
    //vm.videoId = "";
    vm.revealModel = revealModel;
    vm.closeModel = closeModel;
    vm.clickMe = clickMe;

    function revealModel(videoId) {
      console.log(videoId);
      vm.revealModel = true;
    }

    function closeModel() {
      vm.revealModel = false;
    }

    function clickMe() {
      console.log('clicked');
    }
  }
}());