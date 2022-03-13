$(document).ready(function () {

    let href = window.location.pathname.split('/');
    $('#editProfile').on('click', function () {
        location.href = `${window.location.origin}/${href[1]}/profile`;
    });

    $('#dashboard-btn').on('click', function () {
        let role = $('#role').text();
        if (role === 'admin') {
            location.href = '/admin/dashboard';
        } else {
            location.href = '/user/dashboard';
        }
    });

});