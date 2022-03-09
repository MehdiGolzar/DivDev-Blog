$(document).ready(function () {

    let href = window.location.pathname.split('/');
    $('#editProfile').on('click', function () {
        location.href = `${window.location.origin}/${href[1]}/profile`;
    });


    $('#allArticles-btn').on('click', function () {
        location.href = '/article/allArticles';
    });


});