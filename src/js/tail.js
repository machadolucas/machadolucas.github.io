// Shows the page
fadeInPage();

// Navigation menu
function openNav() {
    document.getElementById("sidenav").style.right = "0";
    document.getElementById("sidenav").style.opacity = "1";
}

function closeNav() {
    if (window.innerWidth <= 480) {
        document.getElementById("sidenav").style.right = "-100%";
    } else {
        document.getElementById("sidenav").style.right = "-360px";
    }
    document.getElementById("sidenav").style.opacity = "0";
}

const $menu = $('#sidenav');
$(document).mouseup(function (e) {
    if (!$menu.is(e.target)
        && $menu.has(e.target).length === 0) {
        closeNav();
    }
});

// Resize youtube videos to mobile
var allVideos = $("iframe[src*='//www.youtube.com']");
allVideos.each(function () {
    $(this).data('aspectRatio', this.height / this.width)
        .removeAttr('height').removeAttr('width');
});

$(window).resize(function () {
    allVideos.each(function () {
        var el = $(this);
        var newWidth = el.parent().width() >= 640 ? 640 : el.parent().width();
        el
            .width(newWidth)
            .height(newWidth * el.data('aspectRatio'));
    });
}).resize();

$('a.mail').attr('href', 'mailto:' + address);