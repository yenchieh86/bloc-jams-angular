(function(){
    function LandingCtrl(){
        this.heroTitle = "Turn the Music UP!";
    }
    
    angular
        .module('blocJams')
        .controller('LandingCtrl', LandingCtrl);
    
})();