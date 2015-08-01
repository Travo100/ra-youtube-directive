(function() {
  angular.module('ra-youtube')
  .directive('raYoutubeDirective', raYoutubeDirective);

  function raYoutubeDirective() {
    var directive = {
      templateUrl: 'youtube-template.html',
      restrict: 'E',
      controller: youtubeController,
      scope: {
        videoId : "@",
        value : "@",
        raClass : "@",
        raId : "@"
      },

      controllerAs: 'youtubeCtrl',
      bindToController: true,
      transclude: true
    };
    return directive;
  }

  function youtubeController() {
    var vm = this;
    vm.showVideo = false;
    vm.playVideo = playVideo;
    vm.stopVideo = stopVideo;

    vm.playerVars = {
      controls: 1,
      autoplay: 1,
      modestBranding: 0
    };

    function playVideo() {
      vm.showVideo= true;
    }

    function stopVideo() {
      vm.showVideo = false;
    }

  }
}());