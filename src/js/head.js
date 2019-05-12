function fadeInPage() {
    if (!window.AnimationEvent) {
        return;
    }
    var fader = document.getElementById('fader');
    fader.classList.add('fade-out');
}

document.addEventListener('DOMContentLoaded', function () {
    if (!window.AnimationEvent) {
        return;
    }

    var anchors = document.getElementsByTagName('a');

    for (var idx = 0; idx < anchors.length; idx += 1) {
        if (anchors[idx].hostname !== window.location.hostname || anchors[idx].href.startsWith('javascript')
            || anchors[idx].getAttribute('href').startsWith('#')) {
            continue;
        }
        anchors[idx].addEventListener('click', function (event) {
            var fader = document.getElementById('fader'),
                anchor = event.currentTarget;

            var listener = function () {
                window.location = anchor.href;
                fader.removeEventListener('animationend', listener);
            };
            fader.addEventListener('animationend', listener);

            event.preventDefault();
            fader.classList.add('fade-in');
        });
    }
});

window.addEventListener('pageshow', function (event) {
    if (!event.persisted) {
        return;
    }
    var fader = document.getElementById('fader');
    fader.classList.remove('fade-in');
});

var server = "me.com";
var address = "machadolucas@" + server;

function writemail() {
    document.write(address);
}

function changePage(link) {
    changePageHash(link.hash);
}

function changePageHash(anchor) {
    switch (anchor) {
        case "#home":
            changeContainer('content/home.html', anchor);
            break;
        case "#professional":
            changeContainer('content/professional.html', anchor);
            break;
        case "#portfolio":
            changeContainer('content/portfolio.html', anchor);
            break;
        case "#personal":
            changeContainer('content/personal.html', anchor);
            break;
        default:
            changeContainer('content/home.html', anchor);
            break;
    }
}

function changeContainer(address, anchor) {
    $('html, body').animate({scrollTop: 0}, 300);
    const wrapper = $('#page');
    $('.landing').removeClass('blurred');
    wrapper.fadeOut('fast', function () {
        wrapper.load(address, function () {
            wrapper.fadeIn('fast');

            // Resize youtube videos to mobile
            let allVideos = $("iframe[src*='//www.youtube.com']");
            allVideos.each(function () {
                $(this).data('aspectRatio', this.height / this.width)
                    .removeAttr('height').removeAttr('width');
            });

            $(window).resize(function () {
                allVideos.each(function () {
                    const el = $(this);
                    const newWidth = el.parent().width() >= 640 ? 640 : el.parent().width();
                    el
                        .width(newWidth)
                        .height(newWidth * el.data('aspectRatio'));
                });
            }).resize();
        });
    });
    history.replaceState(null, address, anchor);
}