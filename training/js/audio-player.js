function initAudio() {

    $(".audio-player").each(function () {


        var controlsTimeout;
        var parentid = $(this)[0].id;
        var id = $(this)[0].id + "audio";
        var source = $(this).attr("data-source");
        var title = $(this).attr("data-title");
        var width = $(this).attr("data-width");
        var image = $(this).attr("data-image");


        if (navigator.userAgent.match(/iPhone|iPad|iPod/i) || navigator.userAgent.match(/NOKIA/i)) {
            width = $(".PAGE").width() / 100 * width;
            $(this).css("width", width + 'px');
        }
        else {
            $(this).css("width", width + '%');
        }

        var player = '<img src="images/' + image + '" width="100%">\n'

        player += '<audio class="audioframe" id="' + id + '">\n'

        player += '<source src="files/' + source + '.ogg" type="audio/ogg" />\n'
        player += '<source src="files/' + source + '.mp3" type="audio/mp3" />\n'
        player += 'Your browser does not support the audio element.\n'
        player += '</audio>\n'

        player += '<div class="audiocontrols" id="audiocontrols' + id + '">\n';
        player += '<div class="audiotitle" id="audiotitle' + id + '">' + title + '</div>\n';
        player += '<span class="paused" id="audiotoggle' + id + '"></span>\n';

        player += '<span id="audiototal' + id + '" class="audiototal" ></span>\n';
        player += '<span id="audioduration' + id + '" class="audioduration" ></span>\n';

        /* PROGRESS SECTION */
        player += '<div class="audioprogressdiv" id="videototal' + id + '">\n';
        player += '<progress class="audioprogressBar" id="audioprogress-bar' + id + '" min="0" max="100" value="0"></progress>\n';
        player += '<div class="audiospanprogress" id="audiospanprogress' + id + '"></div>';
        player += '</div>\n';
        /* PROGRESS END */


        if (!(navigator.userAgent.match(/iPhone|iPad|iPod/i) || navigator.userAgent.match(/NOKIA/i))) {
            /*VOLUME SECTION */
            player += '<div class="audiovolume" id="audiovolume' + id + '">\n';
            player += '<div class="audiosound" id="audiosound' + id + '" title="Mute/Unmute sound"></div>\n';
            player += '<span class="audiovolumeCover" id="audiovolumeCover' + id + '" title="Set volume"></span>\n';
            player += '<span class="audiovolumeBar" id="audiovolumeBar' + id + '"></span>\n';
            html += '</div>\n';
            /*VOLUME END */
            player += '</div>\n';
        }
        $(this).html(player);

        var audio = $("#" + id).get(0);



        $("#audiotoggle" + id).click(function () {
            if (audio.paused) {

                audio.play();
                //$(this).text("Pause");
                $(this).switchClass("audiopaused", "audioplay");
            } else {

                audio.pause();
                // $(this).text("Play");
                $(this).switchClass("audioplay", "audiopaused");
            }
            // $(this).toggleClass("paused");
        });

        audio.addEventListener("ended", function () {
            audio.pause();
            //controls.playpause.text("Play");
            $("#audiotoggle" + id).switchClass("audioplay", "audiopaused");
        });

        audio.addEventListener('timeupdate', updateProgressBar, false);

        function updateProgressBar() {

            var progressBar = document.getElementById('audioprogress-bar' + id);
            var percentage = Math.floor((100 / audio.duration) * audio.currentTime);
            /*
            var currentPos = video[0].currentTime; //Get currenttime
            var maxduration = video[0].duration; //Get video duration
            */
            $('#audiototal' + id).text(TimeFormat(audio.duration));
            $('#audioduration' + id).text(TimeFormat(audio.currentTime));
            progressBar.value = 0;

            //progressBar.value = 0;
            //progressBar.innerHTML = percentage + '% played';
            $('#audiospanprogress' + id).css("width", percentage + '%');
            //$('#progressbutton' + id).css("left", percentage + "%");
        }
        var TimeFormat = function (seconds) {
            var m = Math.floor(seconds / 60) < 10 ? '0' + Math.floor(seconds / 60) : Math.floor(seconds / 60);
            var s = Math.floor(seconds - (m * 60)) < 10 ? '0' + Math.floor(seconds - (m * 60)) : Math.floor(seconds - (m * 60));
            return m + ':' + s;
        };

        //$('#audiototal' + id).text(TimeFormat(audio.duration));
        $('#audioduration' + id).text(TimeFormat(audio.currentTime));

        //sound button clicked
        $('#audiosound' + id).click(function () {
            audio.muted = !audio.muted;
            $(this).toggleClass('audiomuted');
            $('#audiovolumeBar' + id).toggleClass('audiovolumeoff');
        });
        //VOLUME BAR
        //volume bar event
        /*
        $('#soundbutton' + id).mousedown(function (e) {

            soundtimeDrag = true;
            updateVolume(e.pageX);
        });
        */
        $('#audiovolumeCover' + id).mousedown(function (e) {

            soundtimeDrag = true;
            updateVolume(e.pageX);
        });

        /*
        $('#volumeCover' + id).on('mousedown', function (e) {
            updateVolume(e.pageX);
        });
        */
        var updateVolume = function (x, vol) {
            var volume = $('#audiovolume' + id);
            var percentage;
            //if only volume have specificed
            //then direct update volume
            if (vol) {
                percentage = vol * 100;
            }
            else {
                var position = x - volume.offset().left;
                percentage = 100 * position / volume.width();
            }

            //ceil to 25 mutiplier
            percentage = Math.ceil(percentage);
            $('#audiovolumeBar' + id).css('width', percentage + '%');


            //Check within range
            if (percentage > 100) {
                percentage = 100;
            }
            if (percentage < 0) {
                percentage = 0;
            }
            //console.log("tid før = " + audio.volume + " procent= " + percentage / 100);
            audio.volume = percentage / 100;
            percentage = percentage - 1;


            //$('#soundbutton' + id).css("left", percentage + "%");
        };
        updateVolume(0, 0.75);


        var timeDrag = false;   /* Drag status */

        $('#audioprogress-bar' + id).mousedown(function (e) {
            timeDrag = true;
            updatebar(e.pageX);
        });


        $('#audiospanprogress' + id).mousedown(function (e) {
            timeDrag = true;
            updatebar(e.pageX);
        });

        /*
        var clickHandler = "click";

        if ('ontouchstart' in document.documentElement) {
            clickHandler = "touchstart";
        }
        */
        $(document).mouseup(function (e) {
            if (timeDrag) {
                timeDrag = false;
                updatebar(e.pageX);
            }

        });

        $(document).mousemove(function (e) {
            if (timeDrag) {
                updatebar(e.pageX);
            }
        });



        //update Progress Bar control
        var updatebar = function (x) {
            var progress = $('#audioprogress-bar' + id);
            var maxduration = audio.duration; //Video duraiton
            var position = x - progress.offset().left; //Click pos
            var percentage = 100 * position / progress.width();

            //Check within range
            if (percentage > 100) {
                percentage = 100;
            }
            if (percentage < 0) {
                percentage = 0;
            }
            //

            audio.currentTime = Math.round(maxduration * percentage / 100);
            //console.log("tid = " + audio.currentTime);
            percentage = percentage - 1;
            // $('#progressbutton' + id).css("left", percentage + "%");
        };
    });


}
