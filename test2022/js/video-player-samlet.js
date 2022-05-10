(function (Popup, $, undefined) {
                            
    Popup.Show = function(html, options) {
        var defaults = {
            width: 80,
            title: null,
            video: false
        };
        var settings = $.extend(true, defaults, options);
        var left = (100 - settings.width) / 2;
        var leftCalc = 'left:calc(' + left + '% - 25px);';
        if(left < 5) {
            leftCalc = '';
        }
        var popup = $('<div class="new-popup no-border"></div>').appendTo($("body"));
        var container = $('<div class="new-popup-container" style="width:' + settings.width + '%;'+leftCalc+'"></div>').appendTo(popup);
        var content = $('<div class="new-popup-content"></div>').appendTo(container);
        if(settings.video) {
            content.addClass("new-popup-content-video");
        }
        
        var closeBtn = $('<div class="new-popup-close"></div>').on("click", function() {
            popup.hide(180, function() {
                popup.remove();
            });
        });
        if(settings.title == null) {
            closeBtn.appendTo(container);
        }
        else {
            var footer = $('<div class="new-popup-footer"></div>').html(settings.title).appendTo(container);
            closeBtn.appendTo(footer);
        }
        if(html instanceof jQuery) {
            html.appendTo(content);
        }
        else {
            content.append(html);
        }
    };

    Popup.ShowVideo = function(source, title, options) {
        var defaults = {
            width: 80,
            video: true,
            showSubtitles: false
        };
        var settings = $.extend(true, defaults, options);
        var video = $('<div class="new-player" data-source="'+source+'"><div class="new-player-title">'+title+'</div></div>');
        if(settings.showSubtitles) {
            video.addClass("cc-active");
        }
        Popup.Show(video, settings);
        VideoPlayer.InitPlayers(video);
    };

    $(function() {
        $(".new-popup-link").each(function() {
            var $this = $(this);
            var title = null;
            var $title = $this.children(".new-popup-link-title");
            var width = $this.attr("data-width");
            if(typeof width === "undefined") {
                width = 80;
            }
            if($title.length > 0) {
                title = $title.html();
            }
            $(this).children(".new-popup-link-a").on("click", function(e) {
                e.preventDefault();
                var element = $this.children(".new-popup-link-content").html();
                Popup.Show(element, {
                    title: title,
                    width: width
                });
            });

        });
    });

}(window.Popup = window.Popup || {}, jQuery));

(function (VideoPlayer, $, undefined) {

    var IsIE = function() {
        var sAgent = window.navigator.userAgent;
        var Idx = sAgent.indexOf("MSIE");
        if (Idx > 0 || !!navigator.userAgent.match(/Trident\/7\./)) {
            return true;
        }
        return false;
    };

    VideoPlayer.PauseAll = function() {
        $(".new-player").removeAttr("playing");
        if($(".new-player video").length > 0) {
            $(".new-player video").each(function() {
                if(typeof $(this)[0].pause !== "undefined") {
                    $(this)[0].pause();
                }
            });
        }
    };

    VideoPlayer.InitPlayers = function(selector) {
        var element;
        if(selector instanceof jQuery) {
            element = selector;
        }
        else {
            element = $(selector);
        }
        element.each(function(index) {
            var $this = $(this);
            if($this.hasClass("video-player-init-done")) {
                $("video").each(function() {
                    $(this)[0].pause();
                });
                // ResizeVideos();
                return false;
            }
            $this.addClass("video-player-init-done");
            var source = $this.attr("data-source");
            var subtitlesId = "T_"+source.replace(' ', '');
            var settings = {
                audio: ($this.attr("data-audio") === "false" ? false : true),
                fullscreen: ($this.attr("data-fullscreen") === "false" ? false : true),
                subtitles: ($this.attr("data-subtitles") === "true" ? true : false)
            };

            var subtitlesContainer = $('<div class="subtitles new-player-subtitles"></div>').prependTo($this);
            var videoContainer = $('<div class="new-player-video"></div>').prependTo($this);
            if(settings.subtitles) {
                $this.addClass("cc-active");
            }
            var $video = $('<video id="video-'+index+'" />').attr("src", "files/"+source+".mp4").appendTo(videoContainer).data("parent", $this);
            var video = $video[0];
            var videoDuration = 0;

            if(subtitles.hasOwnProperty(subtitlesId)) {
                for(var i=0; i < subtitles[subtitlesId].tracks.length; i++) {
                    var tempP = $('<p data-start="'+subtitles[subtitlesId].tracks[i].start+'" data-end="'+subtitles[subtitlesId].tracks[i].end+'" style="display:none;"></p>').html(subtitles[subtitlesId].tracks[i].text).appendTo(subtitlesContainer);
                    tempP.css("direction", subtitles[subtitlesId].tracks[i].direction);
                }
            }
            else {
                console.warn("Missing or wrong subtitles Id: "+subtitlesId, $this);
            }
            
            var footer = $('<div class="new-player-footer"></div>').appendTo($this);
            var title = $this.find(".new-player-title").appendTo(footer);
            var controlsContainer = $('<div class="new-player-controls"></div>').appendTo(footer);

            var playPauseControl = $('<div class="new-player-play-pause-btn"></div>').appendTo(controlsContainer);
            var playBtn = $('<span class="new-player-play-icon"><img src="images/new-player-play.png" /></span>').appendTo(playPauseControl);
            var pauseBtn = $('<span class="new-player-pause-icon"><img src="images/new-player-pause.png" /></span>').appendTo(playPauseControl);
            
            if(settings.audio && !navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
                var volumeControl = $('<div class="new-player-volume-control"></div>').appendTo(controlsContainer);
                var volumeIcon = $('<div class="volume-icon"><img src="images/new-player-audio.png" /></div>').appendTo(volumeControl).on("click", function() {
                    if($video.hasClass("muted")) {
                        if(typeof $video.data("volume") !== "undefined") {
                            video.volume = $video.data("volume");
                        }
                        else {
                            video.volume = 1;
                        }
                        $video.removeData("volume");
                        $video.removeClass("muted");
                    }
                    else {
                        $video.data("volume", video.volume);
                        video.volume = 0;
                        $video.addClass("muted");
                    }
                    UpdateVolumeData(video.volume*100);
                });
                var volumeSlider = $('<div class="new-player-volume-slider"></div>').appendTo(volumeControl);
                
                var volumeBackground = $('<div class="new-player-volume-progress-background">').appendTo(volumeSlider);
                var volumeBar = $('<div class="new-player-volume-progress-over"></div>').appendTo(volumeBackground);
                var volumeDown = false;
                var volumeHandle = $('<div class="new-player-volume-progress-hidden"></div>').appendTo(volumeSlider);
            }

            var indicator = $('<div class="new-player-indicator">0:00 / 0:00</div>').appendTo(controlsContainer);

            var progressContainer = $('<div class="new-player-progress"></div>').appendTo(controlsContainer);
            var progressBackground = $('<div class="new-player-progress-background">').appendTo(progressContainer);
            var progressBar = $('<div class="new-player-progress-over"></div>').appendTo(progressBackground);
            var progressDown = false;
            var progressHandle = $('<div class="new-player-progress-hidden"></div>').appendTo(progressContainer);
            
            if(settings.fullscreen) {
                var fullscreenBtn = $(' <div class="new-player-fullscreen"><img class="open-fullscreen" src="images/new-player-fullscreen.png" /><img class="close-fullscreen" src="images/new-player-close-fullscreen.png" /></div>').appendTo(controlsContainer);
            }
            var accessabilityBtn = $(' <div class="new-player-accessability"><img src="images/new-player-accessability.png" /></div>').appendTo(controlsContainer);
            
            // Event handlers
            if (navigator.userAgent.match(/ANDROID/i) || navigator.userAgent.match(/iPhone|iPad|iPod/i) || navigator.userAgent.match(/NOKIA/i)) {
                progressHandle.on("touchstart", function(e) {
                    var touchmove = function(event) {
                        // console.log(event);
                        if(progressDown) {
                            UpdateProgress(event.touches[0].pageX);
                        }
                    };
                    var touchend = function(event) {
                        e.target.removeEventListener("touchmove", touchmove);
                        e.target.removeEventListener("touchend", touchend);
                        
                        UpdateProgress(event.changedTouches[0].pageX, true);
                        setTimeout(function() {
                            progressDown = false;
                            var playing = $this.attr("data-playing");
                            $this.removeAttr("data-playing");
                            if(playing == "true") {
                                var playPromise = video.play();
                                if (playPromise !== undefined) {
                                    // play is async, so we run the then when it's ready
                                    playPromise.then(function() {

                                    })
                                    .catch(function() {

                                    });
                                }
                            }
                        }, 10);
                    };
                    if($this.attr("playing") == "true") {
                        $this.attr("data-playing", "true");
                    }
                    e.target.addEventListener("touchmove", touchmove);
                    e.target.addEventListener("touchend", touchend);
                    video.pause();
                    progressDown = true;
                    setTimeout(function() {
                        UpdateProgress(e.originalEvent.touches[0].pageX);
                    }, 10);
                });
                
                if(settings.audio && !navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
                    volumeHandle.on("touchstart", function(e) {
                        var touchmove = function(event) {
                            if(volumeDown) {
                                UpdateVolume(event.touches[0].pageX);
                            }
                        };
                        var touchend = function(event) {
                            e.target.removeEventListener("touchmove", touchmove);
                            e.target.removeEventListener("touchend", touchend);
                            if(volumeDown) {
                                volumeDown = false;
                            }
                        };
                        e.target.addEventListener("touchmove", touchmove);
                        e.target.addEventListener("touchend", touchend);
                        volumeDown = true;
                        UpdateVolume(e.originalEvent.touches[0].pageX);
                    });
                }
            }
            else {
                progressHandle.on("mousedown", function(e) {
                    if($this.attr("playing") == "true") {
                        $this.attr("data-playing", "true");
                    }
                    video.pause();
                    progressDown = true;
                    UpdateProgress(e.pageX);
                }).on("mousemove", function(e) {
                    if(progressDown) {
                        UpdateProgress(e.pageX);
                    }
                });

                $(document).on("mouseup", function(e) {
                    if(progressDown) {
                        UpdateProgress(e.pageX);
                        progressDown = false;
                        var playing = $this.attr("data-playing");
                        $this.removeAttr("data-playing");
                        if(playing == "true") {
                            var playPromise = video.play();
                            if(!IsIE()) {
                                if (playPromise !== undefined) {
                                    // play is async, so we run the then when it's ready
                                    playPromise.then(function() {

                                    })
                                    .catch(function() {

                                    });
                                }
                            }
                        }
                    }
                    if(volumeDown) {
                        volumeDown = false;
                    }
                });
                
                if(settings.audio) {
                    volumeHandle.on("mousedown", function(e) {
                        volumeDown = true;
                        UpdateVolume(e.pageX);
                    }).on("mousemove", function(e) {
                        if(volumeDown) {
                            UpdateVolume(e.pageX);
                        }
                    });
                }
            }

            var updateProgressTimeout = null;
            var controlShow = null;
            $this.on("touchmove mousemove", function() {
                if(IsFullscreen()) {
                    $("body").css("cursor", "inherit");
                    clearTimeout(controlShow);
                    footer.slideDown(180);
                    controlShow = setTimeout(function() {
                        if(IsFullscreen()) {
                            footer.slideUp(180);
                            $("body").css("cursor", "none");
                        }
                    }, 1500);
                }
            });

            video.addEventListener("play", function() {
                $this.attr("playing", "true");
            });
            video.addEventListener("pause", function() {
                $this.removeAttr("playing");
            });
            video.addEventListener("loadeddata", function() {
                videoDuration = video.duration;
                ProgressVideo();
            }, false);
            video.addEventListener("timeupdate", function() {
                ProgressVideo();
            }, false);
            if(subtitles.hasOwnProperty(subtitlesId)) {
                video.ontimeupdate = function() {
                    var currentTime = video.currentTime;
                    subtitlesContainer.find("p").each(function() {
                        var start = $(this).attr("data-start");
                        var end = $(this).attr("data-end");
                        var text = $(this).attr("data-text");
                        if((currentTime*1) > (start*1)) {
                            $(this).show();
                        }
                        else {
                            $(this).hide();
                        }
                        if((currentTime*1) > (end*1)) {
                            $(this).hide();
                        }
                    });
                };
            }

            playBtn.on("click", function() {
                video.play();
            });

            pauseBtn.on("click", function() {
                video.pause();
            });

            if(settings.fullscreen) {
                fullscreenBtn.on("click", function() {
                    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement && !$this.hasClass("fullscreen"))
                    {
                        if (document.documentElement.requestFullscreen)
                        {
                            document.documentElement.requestFullscreen();
                            // mainFunction.onFullScreen();
                        }
                        else if (document.documentElement.msRequestFullscreen)
                        {
                            document.documentElement.msRequestFullscreen();
                            // mainFunction.onFullScreen();
                        }
                        else if (document.documentElement.mozRequestFullScreen)
                        {
                            document.documentElement.mozRequestFullScreen();
                            // mainFunction.onFullScreen();
                        }
                        else if (document.documentElement.webkitRequestFullscreen)
                        {
                            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                            // mainFunction.onFullScreen();
                        }
                        $this.addClass("fullscreen");
                        controlShow = setTimeout(function() {
                            if(IsFullscreen()) {
                                footer.slideDown(180);
                                $("body").css("cursor", "none");
                            }
                        }, 1500);
                    }
                    else
                    {
                        if (document.exitFullscreen)
                        {
                            document.exitFullscreen();
                            // mainFunction.exitFullScreen();
                        }
                        else if(document.msExitFullscreen)
                        {
                            document.msExitFullscreen();
                            // mainFunction.exitFullScreen();
                        }
                        else if (document.mozCancelFullScreen)
                        {
                            document.mozCancelFullScreen();
                            // mainFunction.exitFullScreen();
                        }
                        else if (document.webkitExitFullscreen)
                        {
                            document.webkitExitFullscreen();
                            // mainFunction.exitFullScreen();
                        }
                        $this.removeClass("fullscreen");
                    }
                    if(navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
                        // Wait for css to redraw before calling resize event
                        setTimeout(function() {
                            ResizeVideos();
                        }, 10);
                    }
                });
            }

            accessabilityBtn.on("click", function() {
                $this.toggleClass("cc-active");
            });

            // Functions
            var ProgressVideo = function() {
                SetIndicator(video.currentTime, videoDuration);
                var percent = (100 / videoDuration) * video.currentTime;
                progressBar.css("width", percent+"%");
            };

            var UpdateProgress = function(pageX, forceUpdate) {
                var position = pageX - progressHandle.offset().left;
                var percent = Math.min(Math.max(100 * position / progressHandle.width(), 0), 100);
                

                SetIndicator(((videoDuration / 100) * percent), videoDuration);
                
                // Don't update video before we are done dragging progress bar on small devices
                if (forceUpdate === true || (!navigator.userAgent.match(/ANDROID/i) && !navigator.userAgent.match(/iPhone|iPad|iPod/i) && !navigator.userAgent.match(/NOKIA/i))) {
                    UpdateVideo(percent);
                }
                
                progressBar.css("width", percent+"%");
            };

            var UpdateVideo = function(percent) {
                // Using a timeout to set the currentTime so we don't set it multiple times per millisecond
                clearTimeout(updateProgressTimeout);
                updateProgressTimeout = setTimeout(function() {
                    video.currentTime = videoDuration * percent / 100;
                }, 10);
            };

            var SetIndicator = function(start, end) {
                var startDate = new Date(null);
                startDate.setSeconds(start);
                var endDate = new Date(null);
                endDate.setSeconds(end);
                indicator.html(startDate.toISOString().substr(11, 8)+" / "+endDate.toISOString().substr(11, 8));
            };
            
            if(settings.audio && !navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
                var UpdateVolume = function(pageX) {
                    var position = pageX - volumeHandle.offset().left;
                    var percent = Math.min(Math.max(100 * position / volumeHandle.width(), 0), 100);
                    UpdateVolumeData(percent);
                };

                var UpdateVolumeData = function(percent) {
                    volumeBar.css("width", percent+"%");
                    video.volume = percent/100;
                };
            }
        });
        setTimeout(function() {
            ResizeVideos();
        }, 10);
    };

    var resizeEvent = null;
    
    $(window).on("resize", function() {
        clearTimeout(resizeEvent);
        resizeEvent = setTimeout(ResizeVideos, 100);
    });

    var ResizeVideos = function() {
        $("video:visible").each(function() {
            var width = $(this).width();
            var fontSize = width/100*2.5;
            if(fontSize > 45) {
                fontSize = 45;
            }
            else if(fontSize < 11) {
                fontSize = 11;
            }
            $(this).data("parent").children(".subtitles").children("p").css({
                "font-size": fontSize+"px"
            });
        });
    };

}(window.VideoPlayer = window.VideoPlayer || {}, jQuery));

if (document.onfullscreenchange === null) {
    document.onfullscreenchange = OnFullScreenChange;
}
else if (document.onmsfullscreenchange === null) {
    document.onmsfullscreenchange = OnFullScreenChange;
}
else if (document.onmozfullscreenchange === null) {
    document.onmozfullscreenchange = OnFullScreenChange;
}
else if (document.onwebkitfullscreenchange === null) {
    document.onwebkitfullscreenchange = OnFullScreenChange;
}

function OnFullScreenChange() {
    if(!IsFullscreen()) {
        $("body").css("cursor", "inherit");
        $(".fullscreen .new-player-footer").show();
        $(".fullscreen").removeClass("fullscreen");
    }
}

function IsFullscreen() {
    // If no element is returned it means there is no fullscreen anymore
    // We change the potential null to a boolean by inverting it ( ! ) twice.
    if(navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
        return $(".fullscreen").length != 0;
    }
    return !!(document.fullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement);
}

function videoPlayer() {
    $(function() {
        // VideoPlayer.InitPlayers(".new-player");
    });
}