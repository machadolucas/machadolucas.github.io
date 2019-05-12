if (window.location.hash === '') {
    window.location.hash = '#home';
}
changePageHash(window.location.hash);

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

$('a.mail').attr('href', 'mailto:' + address);

//Google Analytics
(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o), m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script',
    '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-41237689-1', 'machadolucas.me');
ga('require', 'displayfeatures');
ga('send', 'pageview');