var playing = false;
var playmode = "";
var titlehided = false;
console.log(window.location.search);
var debugmode = false;
if (window.location.search.search("debug=1") > 0) { debugmode = true; }
function cons(content) {
    console.log(content);
    if (debugmode) {
        content = $(".logcontents").val() + content + "\n";
        $(".logcontents").val(content);
    }
}
function clearlog() {
    $(".logcontents").val("");
}
$(document).ready(function () {
    if (debugmode) {
        $(".log").css("display", "block");
        var str = "调试模式已启动\n";
        $(".logcontents").val(str);
        $(".HLSmode").css("display", "");
        $(".log").css("width", $(".logcontents").width() + "px");
        $(".danmutime").css("display", "inline-block");
        $("#danmu").css({ "background-color": "red", "opacity": "0.5" });
    }
    //设置播放器大小
    cons("窗口高度:" + $(window).height() + " header高度:" + $("header").height() + " 控制条高度:" + $(".controls").height() + " title高度:" + $(".title-section").height());
    if (playmode == "FLV") { //FLV模式下
        $("video").css("max-height", ($(window).height() - $("header").height() - $(".title-section").height()) * 0.8 + "px");
        $(".controls").width($("video").width());
        $("#danmu").css({ "top": $("video").offset().top + 3 + "px", "left": $("video").offset().left + 3 + "px", "width": $("video").width(), "height": $("video").height() });
        $("#vol").val($("video").volume * 100);
        $("#vol").change(function () {
            $("video").volume = $("#vol").val() / 100;
        });
        $('video').trigger('play');
        playing = true;
        $("#play").css("background-image", "url(src/img/pause.SVG)");
    } else { //jwplayer模式下
        // $("#player").css("height", ($(window).height() - $("header").height() - $(".title-section").height()) * 0.8 + "px");
        $("#player").css("width", $(window).width() * 0.9);
        $("#player").css("height", $("#player").width() * 9 / 16);
        $(".controls").width($("#player").width());
        $("#danmu").css({ "top": $("#player").offset().top + 3 + "px", "left": $("#player").offset().left + 3 + "px", "width": $("#player").width(), "height": $("#player").height() });
        $("#vol").val(jwplayer().getVolume());
        $("#vol").change(function () {
            jwplayer().setVolume($("#vol").val());
        });
    }
    //---------响应按钮点击事件-------------
    $("#danmuctrl").click(function () {
        if (!titlehided) {
            cons("显示弹幕控制条");
            $(".title-section").hide();
            $(".ctr").fadeToggle("normal");
            titlehided = true;
        } else {
            cons("隐藏弹幕控制条");
            $(".title-section").fadeToggle("normal");
            $(".ctr").hide();
            titlehided = false;
        }
    });
    $("#fullscreen").click(function () {
        if (playmode == "FLV") {
            var ele = document.getElementById("fullscr");
            // going full-screen
            if (ele.requestFullscreen) {
                ele.requestFullscreen();
            }
            else if (ele.webkitRequestFullscreen) {
                ele.webkitRequestFullscreen();
            }
            else if (ele.msRequestFullscreen) {
                ele.msRequestFullscreen();
            }
            else if (ele.mozRequestFullScreen) {
                ele.mozRequestFullScreen();
            }
        } else {
            jwplayer().setFullscreen(true);
        }

    });
});
$(window).resize(function () {  //当浏览器大小变化时
    cons("窗口高度:" + $(window).height() + " header高度:" + $("header").height() + " 控制条高度:" + $(".controls").height() + " title高度:" + $(".title-section").height());
    if (playmode == "FLV") { //FLV模式下
        $("video").css("max-height", ($(window).height() - $("header").height() - $(".title-section").height()) * 0.8 + "px");
        $(".controls").width($("video").width());
        $("#danmu").css({ "top": $("video").offset().top + 3 + "px", "left": $("video").offset().left + 3 + "px", "width": $("video").width(), "height": $("video").height() });
    } else { //jwplayer模式下
        // $("#player").css("height", ($(window).height() - $("header").height() - $(".title-section").height()) * 0.8 + "px");
        $("#player").css("width", $(window).width() * 0.9);
        $("#player").css("height", $("#player").width() * 9 / 16);
        $(".controls").width($("#player").width());
        $("#danmu").css({ "top": $("#player").offset().top + 3 + "px", "left": $("#player").offset().left + 3 + "px", "width": $("#player").width(), "height": $("#player").height() });
    }
});
function play() {
    if (playing) {
        $('video').trigger('pause');
        playing = false;
        $("#play").css("background-image", "url(src/img/play.SVG)");
    } else {
        $('video').trigger('play');
        playing = true;
        $("#play").css("background-image", "url(src/img/pause.SVG)");
    }
}