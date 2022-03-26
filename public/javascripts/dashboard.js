$(document).ready(function () {

    let href = window.location.pathname.split('/');
    $('#editProfile').on('click', function () {
        location.href = `${window.location.origin}/${href[1]}/profile`;
    });

    $('nav').on('click', '.logout-btn', function (e) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: "/auth/logout",
            success: function (res) {
                return location.href = '/';
            },
            error: function (err) {
                console.log(err);
            }
        });
    });

});