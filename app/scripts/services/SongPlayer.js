(function(){
    function SongPlayer($rootScope,Fixtures){
        
        /**
        * @desc for access method
        * @type {Object}
        */
        var SongPlayer = {};
        
        /**
        * @desc current playing song
        * @type {Object} 
        */
        var currentAlbum = Fixtures.getAlbum();
        
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
        
        /**
        * @function stopSong
        * @desc Stops currently playing song and set property of the song to null
        */
        var stopSong = function(){
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        }
        
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song){
            if(currentBuzzObject){
                stopSong();
            }
                
            currentBuzzObject = new buzz.sound(song.audioUrl,{
                formats: ['mp3'],
                preload: true
            });
            
            currentBuzzObject.bind('timeupdate',function(){
                $rootScope.$apply(function(){
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });
                
            SongPlayer.currentSong = song;
        };
        
        /**
        * @function playSong
        * @desc Play currentBuzzObject, and set song.playing to true
        * @param {Object} song
        */
        var playSong = function(song){
            currentBuzzObject.play();
            song.playing = true;
        };
        
        /**
        * @function getSongIndex
        * @desc get song index
        * @param {object} song
        * return {number}
        */
        var getSongIndex = function(song){
            return currentAlbum.songs.indexOf(song);
        };
        
        /**
        * @desc Active song object from list of songs
        * @type {Object}
        */
        SongPlayer.currentSong = null;
        
        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;
        
        SongPlayer.volume = null;
        
        /**
        * @function SongPlayer.play
        * @desc use player bar play buttom to play song
        * @param {object} song
        */
        SongPlayer.play = function(song){
            song = song || SongPlayer.currentSong;
            if(SongPlayer.currentSong !== song){
                setSong(song);
                playSong(song);
            } else if(SongPlayer.currentSong === song){
                if(currentBuzzObject.isPaused()){
                    playSong(song);
                    
                }
            }
            
        };
        
        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time){
            if (currentBuzzObject){
                currentBuzzObject.setTime(time);
            }
        };

        
        /**
        * @function SongPlayer.pause
        * @desc use player bar pause buttom to pause song
        * @param {object} song
        */
        SongPlayer.pause = function(song){
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /**
        * @function SongPlayer.previous
        * @desc use play bar previous buttom to play previous song
        */
        SongPlayer.previous = function(){
            /**
            * @desc get previous song index
            * @type {number}
            */
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if(currentSongIndex < 0){
                stopSong();
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        /**
        * @function SongPlayer.next
        * @desc use play bar next buttom to play next song
        */
        SongPlayer.next = function(){
            /**
            * @desc get next song index
            * @type {number}
            */
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex > (currentAlbum.songs.length)-1){
                stopSong();
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
            
        };
        
        SongPlayer.setVolum = function(){
            SongPlayer.volume = currentBuzzObject.setVolum();
        };
        
        SongPlayer.setToMute = function(){
            SongPlayer.volume = null;
        }
        
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope','Fixtures',SongPlayer]);
})();