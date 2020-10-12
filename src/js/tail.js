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
