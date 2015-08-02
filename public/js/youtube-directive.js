(function() {
  angular.module('ra-youtube')
  .directive('raYoutubeLightbox', raYoutubeLightbox);

  function raYoutubeLightbox() {
    var directive = {
      templateUrl: 'youtube-template.html',
      restrict: 'E',
      controller: youtubeController,
      scope: {
        videoId : "@",
        raText : "@",
        raClass : "@",
        raId : "@"
      },
      controllerAs: 'youtubeCtrl',
      bindToController: true
    };
    return directive;
  }

  function youtubeController() {
    var vm = this;
    vm.playVideo = playVideo;
    vm.stopVideo = stopVideo;
    vm.showVideo = false;
    vm.playerVars = {
      controls: 1,
      autoplay: 0,
      modestBranding: 0
    };

    function playVideo() {
      vm.showVideo = true;
    }

    function stopVideo() {
      vm.showVideo = false;
    }

  }
}());