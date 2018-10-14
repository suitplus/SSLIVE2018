var imgindex = 1;
var str = "";
function setsize() {
    $(".main").css("top", $("header").height() + "px");
    $(".main").css("height", $(window).height() - $("header").height());

}
$(document).ready(function () {
    $('#timer').countdown('2018/10/25', function (event) {
        $(this).html(event.strftime('%D <span class="small">天</span> %H <span class="small">时</span> %M <span class="small">分</span> %S <span class="small">秒</span>'));
    });
    setsize();
    $(".timer").fadeIn().queue(function (next) {
        $(".promote").fadeIn();
        $(".bg-img").fadeIn().queue(function (next) {
            $("#1").fadeIn(function () {
                $("#dot1").css("background-color", "white");
            });
            next();
        });
        next();
    });
    setInterval(function () { //“向下滑动”的动画
        $(".promote").animate({ bottom: "+=50px" }, { duration: 2000 }).queue(function (next) {
            $(".promote").fadeOut(function () { $(".promote").css("bottom", "0"); });
            next();
        }).queue(function (next) {
            $(".promote").fadeIn();
            next();
        });
    }, 10000);
    setInterval(function () { //图片轮播
        if (imgindex >= 3) {
            imgindex = 1;
            $("#3").fadeOut(function () {
                $("#dot3").css("background-color", "#888");
                $("#1").fadeIn(function () {
                    $("#dot1").css("background-color", "white");
                });
            });
        } else {
            imgindex++;
        }
        console.log(imgindex);
        str = "#" + (imgindex - 1);
        $(str).fadeOut(function () {
            str = "#dot" + (imgindex - 1);
            $(str).css("background-color", "#888");
            str = "#" + imgindex;
            $(str).fadeIn(function () {
                str = "#dot" + imgindex;
                $(str).css("background-color", "white");
            });
        });
    }, 7500);
    //---------强制切换图片---------------
    $("#dot1").click(function () {
        imgindex = 1;
        $("#3").fadeOut();
        $("#2").fadeOut(function () {
            $("#dot2").css("background-color", "#888");
            $("#dot3").css("background-color", "#888");
            $("#1").fadeIn(function () {
                $("#dot1").css("background-color", "white");
            });
        });
    });
    $("#dot2").click(function () {
        imgindex = 2;
        $("#1").fadeOut();
        $("#3").fadeOut(function () {
            $("#dot1").css("background-color", "#888");
            $("#dot3").css("background-color", "#888");
            $("#2").fadeIn(function () {
                $("#dot2").css("background-color", "white");
            });
        });
    });
    $("#dot3").click(function () {
        imgindex = 3;
        $("#1").fadeOut();
        $("#2").fadeOut(function () {
            $("#dot2").css("background-color", "#888");
            $("#dot1").css("background-color", "#888");
            $("#3").fadeIn(function () {
                $("#dot3").css("background-color", "white");
            });
        });
    });
});
$(window).resize(function () {
    setsize();
});