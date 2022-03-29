$(document).ready(function () {

    $('.profile-btn').on('click', function () {
        let role = $('#role').text();
        if (role === 'admin') {
          location.href = '/admin/profile';
        } else {
          location.href = '/user/profile';
        }
      });


});