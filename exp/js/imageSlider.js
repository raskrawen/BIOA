var donehandle = true;

function imageSlider(strdiv, width, height) {

    var parentid = "popUpDivImage";
    var ratio = parseInt(3) / parseInt(4);

    var html = '<div class="imageHolder">\n';
    html += '<div class="imageViewer" style="position: relative; width: 99%; text-align:center;">\n';
    html += '<img src="files/2.jpg" alt="" />\n';
    html += '</div>\n';

    html += '<div class="thumbHolder"style="position: absolute; width: 100%; bottom:0px;">\n';

    html += '<div class="divitems" id="firstTumbHidden" data-slide="10" style="position: absolute; top: 0px; left: -20%; width: 19%;">\n';
    html += '   <img src="files/9.jpg" alt="" />\n';
    html += '</div>\n';

    html += '<div class="divitems" id="firstTumb" data-slide="1" style="position: absolute; top: 0px; width: 19%; ">\n';
    html += '   <img src="files/1.jpg" alt="" />\n';
    html += '</div>\n';

    html += '<div class="divitems" id="secondTumb" data-slide="2" style="position: absolute; top: 0px; width: 19%; left: 20%; ">\n';
    html += '   <img src="files/1.jpg" alt="" />\n';

    html += ' </div>\n';

    html += '<div class="divitems active" id="active" data-slide="3" style="position: absolute; top: 0px; width:19%; left: 40%; ">\n';

    html += '<img src="files/2.jpg" alt="" />\n';
    html += '</div>\n';

    html += '<div class="divitems" id="thirdTumb" data-slide="4" style="position: absolute; top: 0px; width: 19%; left: 60%;">\n';
    html += '    <img src="files/3.jpg" alt=""  />\n';

    html += ' </div>\n';

    html += '<div class="divitems" id="fourthTumb" data-slide="5" style="position: absolute; top: 0px; width: 19%; left: 80%;">\n';

    html += '     <img src="files/4.jpg" alt=""  />\n';
    html += '</div><br />\n';

    html += '<div class="divitems" id="lastTumb" data-slide="5" style="position: absolute; top: 0px; width: 19%; left: 100%;">\n';
    html += '     <img src="files/4.jpg" alt=""  />\n';
    html += '</div><br />\n';
    html += '</div><br />\n';
    html += '</div>\n';
    html += '<div id="leftArrow" class="fbtnFirst" style="color:yellow; float:left;"><img src="images/pilLeft.png" style="height: 100%;"></div>\n';
    html += '<div id="rightArrow" class="fbtnLast" style="color:yellow; margin-left: 60px; float:right;"><img src="images/pilRight.png" style="height: 100%;"></div>\n';

    $("#" + parentid).append(html);




    //$("#" + parentid).css("width", "40%");
    //$("#" + parentid).css("overflow", "hidden");
    $("#" + parentid).css("background-color", "#262626");


    $(".divitems").css("height", "100%");

    if ($(window).width() > 1024) var wantedWidth = 0.5 * $(window).width();
    else var wantedWidth = 0.8 * $(window).width();
    //var wantedHeight = 0.8 * $(window).height();


    $("#" + parentid).css("width", "" + wantedWidth + "px");
    var wantedImageholderHeight = (wantedWidth - 40) * ratio;
    var wantedthumbHolderHeight = 0.09 * wantedImageholderHeight;
    var wantedParentHeight = wantedImageholderHeight + wantedthumbHolderHeight + 40;



    $("#" + parentid).css("height", "" + wantedParentHeight + "px");
    $(".imageViewer").css("height", "" + wantedImageholderHeight + "px");
    $(".thumbHolder").css("height", "" + wantedthumbHolderHeight + "px");
    $(".fbtnFirst").css("height", "" + wantedthumbHolderHeight + "px");
    $(".fbtnLast").css("height", "" + wantedthumbHolderHeight + "px");
    //DETECT THUMB SIZES
    console.log("wantedParentHeight = " + wantedParentHeight + " px wantedImageholderHeight = " + wantedImageholderHeight + " px wantedthumbHolderHeight = " + wantedthumbHolderHeight + "wantedWidth = " + wantedWidth);


    initImage();
    $(window).resize(function () {
        if ($(window).width() > 1024) var wantedWidth = 0.5 * $(window).width();
        else var wantedWidth = 0.8 * $(window).width();
        //var wantedHeight = 0.8 * $(window).height();



        $("#" + parentid).css("width", "" + wantedWidth + "px");
        var wantedImageholderHeight = (wantedWidth - 40) * ratio;
        var wantedthumbHolderHeight = 0.09 * wantedImageholderHeight;
        var wantedParentHeight = wantedImageholderHeight + wantedthumbHolderHeight + 40;

        //TEST FOR A OUT OF SCREEN
        if ((wantedParentHeight + 0.08 * $(window).height()) > $(window).height()) {
            wantedParentHeight = $(window).height() - 0.16 * $(window).height();
            wantedImageholderHeight = wantedParentHeight * 0.8;
            wantedthumbHolderHeight = wantedImageholderHeight * 0.1;
            wantedWidth = (wantedImageholderHeight + 40 * ratio) / ratio;
            $("#" + parentid).css("width", "" + wantedWidth + "px");
            console.log(wantedParentHeight);
        }

        $("#" + parentid).css("height", "" + wantedParentHeight + "px");
        $(".imageViewer").css("height", "" + wantedImageholderHeight + "px");
        $(".thumbHolder").css("height", "" + wantedthumbHolderHeight + "px");
        $(".fbtnFirst").css("height", "" + wantedthumbHolderHeight + "px");
        $(".fbtnLast").css("height", "" + wantedthumbHolderHeight + "px");
    });

    $('.fbtnFirst').click(function (event) {

        var clicked = $("#active").attr('data-slide');
        var wanted = parseInt(clicked) + 1;
        var length = 0;
        $(".items").each(function () {
            length = parseInt(length) + 1;
        });
        if (wanted > length) wanted = 1;
        //$(".divitems img").css("width", "auto");
        $(".imageViewer").html($(".divitems[data-slide='" + wanted + "']").html());
        //if ($(".imageViewer img").height() > $(".imageViewer").height())
        //    $(".imageViewer").css("width", "100%");
        slideImages(wanted, "left", "", length);
        leftclickhandle = true;
    });

    $('.fbtnLast').click(function (event) {

        var clicked = $("#active").attr('data-slide');
        var wanted = parseInt(clicked) - 1;
        var length = 0;
        $(".items").each(function () {
            length = parseInt(length) + 1;
        });
        if (wanted < 1) wanted = length;
        //$(".divitems img").css("width", "auto");
        $(".imageViewer").html($(".divitems[data-slide='" + wanted + "']").html());
        //if ($(".imageViewer img").height() > $(".imageViewer").height())
        //    $(".imageViewer").css("width", "100%");
        slideImages(wanted, "right", "", length);
        rightclickhandle = true;
    });

    $('.divitems').click(function (event) {
        var clicked = $(this).attr('data-slide');
        var wanted = clicked;

        var length = 0;
        $(".items").each(function () {
            length = parseInt(length) + 1;
        });
        //$(".divitems img").css("width", "auto");
        $(".imageViewer").html($(".divitems[data-slide='" + clicked + "']").html());
        //if ($(".imageViewer img").height() > $(".imageViewer").height())
        //    $(".imageViewer").css("width", "100%");
        slideImages(wanted, "", "", length);

    });

    //var interval = window.setInterval(function () { itemAutoSlide() }, 3000);
    $('.stop').click(function (event) {
        clearInterval(interval);
    });

    function initImage() {
        var clicked = 1;
        var wanted = clicked;

        var length = 0;
        $(".items").each(function () {
            length = parseInt(length) + 1;
        });

        slideImages(wanted, "", "", length);
        setSize();
        $(".imageViewer").html($(".divitems[data-slide='" + clicked + "']").html());
    }

    function itemAutoSlide() {
        var clicked = $("#active").attr('data-slide');
        var wanted = parseInt(clicked) + 1;

        if (wanted > 10) wanted = 1;
        //$(".divitems img").css("width", "auto");
        $(".imageViewer").html($(".divitems[data-slide='" + wanted + "']").html());
        //if ($(".imageViewer img").height() > $(".imageViewer").height())
        //    $(".imageViewer").css("width", "100%");
        slideImages(wanted, "left", "");
    }

    function slideImages(wanted, direction, animation, length) {
        // Clicked - 2


        if (donehandle) {

            donehandle = false;
            var clicked = parseInt(wanted);
            if (clicked === 1) clicked = length - 2
            else if (clicked === 2) clicked = length - 1;
            else if (clicked === 3) clicked = length;
            else clicked = parseInt(wanted) - 3;

            $("#firstTumbHidden").html($(".items[data-slide='" + clicked + "']").html());

            $("#firstTumbHidden").css("left", "-20%");
            /*
            if (animation === "animation") {

                if (direction === "left") {
                    $("#firstTumbHidden img").css("left", "100%");
                    $("#firstTumbHidden img").animate({ "left": "-=100%" }, "slow");
                }
                else {
                    $("#firstTumbHidden img").animate({ "left": "+=100%" }, "slow");
                }
            }
            */
            $("#firstTumbHidden").attr("data-slide", clicked);

            clicked = parseInt(wanted);
            if (clicked === 1) clicked = length - 1;
            else if (clicked === 2) clicked = length;
            else clicked = parseInt(wanted) - 2;

            $("#firstTumb").html($(".items[data-slide='" + clicked + "']").html());
            $("#firstTumb").css("left", "0");

            /*
            if (animation === "animation") {
        
                if (direction === "left") {
                    //clicked = parseInt(wanted) - 1;
                    // if (clicked < 0) clicked = 10;
            
                    $("#firstTumb").html($(".items[data-slide='" + clicked + "']").html());
                    $("#firstTumb img").css("left", "100%");
                    $("#firstTumb img").animate({ "left": "-=100%" }, "slow");
                }
                else {
                    $("#firstTumb").html($(".items[data-slide='" + clicked + "']").html());
                    //$("#firstTumb img").css("left", "-100%");
                    $("#firstTumb img").animate({ "left": "+=100%" }, "slow");
                    console.log("Right = ");
                }
             }
             */
            $("#firstTumb").attr("data-slide", clicked);

            clicked = parseInt(wanted);
            if (clicked === 1) clicked = length;
            else clicked = parseInt(wanted) - 1;

            $("#secondTumb").html($(".items[data-slide='" + clicked + "']").html());
            $("#secondTumb").css("left", "20%");
            /*
            if (animation === "animation") {


                if (direction === "left") {
                    $("#secondTumb img").css("left", "100%");
                    $("#secondTumb img").animate({ "left": "-=100%" }, "slow");
                }
                else {
                    $("#secondTumb img").animate({ "left": "+=100%" }, "slow");
                }

            }
            */
            $("#secondTumb").attr("data-slide", clicked);

            clicked = parseInt(wanted);
            if (clicked > length) clicked = 1;
            if (clicked < 1) clicked = length;
            //set clicked in middle
            $("#active").html($(".items[data-slide='" + clicked + "']").html());
            $("#active").css("left", "40%");
            /*
            if (animation === "animation") {
                if (direction === "left") {
                    $("#active img").css("left", "100%");
                    $("#active img").animate({ "left": "-=100%" }, "slow");
                }
                else {
                    $("#active img").animate({ "left": "+=100%" }, "slow");
                }
            }
            */
            $("#active").attr("data-slide", clicked);


            // Clicked + 1
            clicked = parseInt(wanted) + 1;
            if (clicked > length) clicked = 1;
            $("#thirdTumb").html($(".items[data-slide='" + clicked + "']").html());
            $("#thirdTumb").css("left", "60%");
            /*
            if (animation === "animation") {
                if (direction === "left") {
                    $("#thirdTumb img").css("left", "100%");
                    $("#thirdTumb img").animate({ "left": "-=100%" }, "slow");
                }
                else {
                    $("#thirdTumb img").animate({ "left": "+=100%" }, "slow");
                }
            }
            */
            $("#thirdTumb").attr("data-slide", clicked);


            // clicked + 2
            if (clicked == 1) clicked = 2;
            else if (clicked == length) clicked = 1;
            else clicked = parseInt(wanted) + 2;



            $("#fourthTumb").html($(".items[data-slide='" + clicked + "']").html());
            $("#fourthTumb").css("left", "80%");
            /*
            if (animation === "animation") {
                if (direction === "left") {
                    $("#fourthTumb img").css("left", "100%");
                    $("#fourthTumb img").animate({ "left": "-=100%" }, "slow");
                }
                else {
                    $("#fourthTumb img").animate({ "left": "+=100%" }, "slow");
                }
            }
            */
            $("#fourthTumb").attr("data-slide", clicked);

            if (clicked == 2) clicked = 3;
            else if (clicked == 1) clicked = 2;
            else if (clicked == length) clicked = 1;
            else clicked = parseInt(wanted) + 3;
            $("#lastTumb").html($(".items[data-slide='" + clicked + "']").html());
            $("#lastTumb").css("left", "100%");
            /*
            if (animation === "animation") {
                if (direction === "left") {
                    $("#lastTumb img").css("left", "100%");
                    $("#lastTumb img").animate({ "left": "-=100%" }, "slow");
                }
                else {
                    $("#lastTumb img").animate({ "left": "+=100%" }, "slow");
                }
            }
            */
            $("#lastTumb").attr("data-slide", clicked);



            if (direction === "left") {
                $(".thumbHolder").css("left", "20%");
                $(".thumbHolder").animate({ "left": "-=20%" }, "slow", function () {

                    donehandle = true;
                });
            }
            else {
                $(".thumbHolder").css("left", "-20%");
                $(".thumbHolder").animate({ "left": "+=20%" }, "slow", function () {

                    donehandle = true;
                });
            }

            setSize();
        }


    }
    function setSize() {
        $("#" + parentid).css("width", "" + wantedWidth + "px");
        if ($(window).width() > 1024) var wantedWidth = 0.5 * $(window).width();
        else var wantedWidth = 0.8 * $(window).width();
        //var wantedHeight = 0.8 * $(window).height();



        $("#" + parentid).css("width", "" + wantedWidth + "px");
        var wantedImageholderHeight = (wantedWidth - 40) * ratio;
        var wantedthumbHolderHeight = 0.09 * wantedImageholderHeight;
        var wantedParentHeight = wantedImageholderHeight + wantedthumbHolderHeight + 40;

        //TEST FOR A OUT OF SCREEN
        if ((wantedParentHeight + 0.08 * $(window).height()) > $(window).height()) {
            wantedParentHeight = $(window).height() - 0.16 * $(window).height();
            wantedImageholderHeight = wantedParentHeight * 0.8;
            wantedthumbHolderHeight = wantedImageholderHeight * 0.1;
            wantedWidth = (wantedImageholderHeight + 40 * ratio) / ratio;
            $("#" + parentid).css("width", "" + wantedWidth + "px");
            console.log(wantedParentHeight);
        }

        $("#" + parentid).css("height", "" + wantedParentHeight + "px");
        $(".imageViewer").css("height", "" + wantedImageholderHeight + "px");
        $(".thumbHolder").css("height", "" + wantedthumbHolderHeight + "px");
        $(".fbtnFirst").css("height", "" + wantedthumbHolderHeight + "px");
        $(".fbtnLast").css("height", "" + wantedthumbHolderHeight + "px");
    }


}
   


