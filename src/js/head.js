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

const server = "me.com";
const address = "machadolucas@" + server;

function writemail() {
    document.write(address);
}

function changePage(link) {
    changePageHash(link.hash);
}

function changePageHash(anchor) {
    let address = getAddressforAnchor(anchor);
    changeContainer(address);
    if (window.initialized) {
        history.pushState(null, address, anchor);
    } else {
        window.initialized = true;
        history.replaceState(null, address, anchor);
    }
}

function getAddressforAnchor(anchor) {
    switch (anchor) {
        case "#home":
            return 'content/home.html';
        case "#professional":
            return 'content/professional.html';
        case "#portfolio":
            return 'content/portfolio.html';
        case "#personal":
            return 'content/personal.html';
        default:
            return 'content/home.html';
    }
}

window.initialized = false;

function changeContainer(address) {
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
}

window.onpopstate = function (event) {
    changeContainer(getAddressforAnchor(window.location.hash));
};
