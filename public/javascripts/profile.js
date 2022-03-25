$(document).ready(function () {

    let editBtn = $('#editBtn');
    let logoutBtn = $('#logoutBtn')


    logoutBtn.click(function (e) {
        e.preventDefault();

        if (logoutBtn.text() === 'Delete') {
            $.ajax({
                type: "DELETE",
                url: "/user/delete",
                success: function (res) {
                    if (res.success === true) {
                        $('#alert').css('color', '#ff142a');
                        $('#alert').text(res.msg);
                        $('#alert').fadeIn();
                        setTimeout(() => {
                            return location.href = '/'
                        }, 3000)
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
        } else  {
            $.ajax({
                type: "GET",
                url: "/auth/logout",
                success: function (res) {
                    console.log(res);
                    if (res.success === true) {
                        $('#alert').css('color', '#57b0ff');
                        $('#alert').text(res.msg);
                        $('#alert').fadeIn();
                        setTimeout(() => {
                            return location.href = '/'
                        }, 3000)
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
        }
    });


    editBtn.click(function (e) {
        e.preventDefault();

        if (editBtn.text() === 'Edit') {
            editBtn.removeClass('btn-warning');
            editBtn.addClass('btn-success');
            editBtn.text('Save');

            logoutBtn.removeClass('btn-warning');
            logoutBtn.addClass('btn-danger');
            logoutBtn.text('Delete');

            $('input[name != username]').removeAttr('disabled');
            $('#gender').removeAttr('disabled');
            $('input[name != username]').removeClass('text-light');



        } else {

            const thisUser = {};
            thisUser.firstName = $('#firstName').val();
            thisUser.lastName = $('#lastName').val();
            thisUser.email = $('#email').val();
            thisUser.phoneNumber = $('#phoneNumber').val();
            thisUser.gender = $('#gender').val();

            console.log(thisUser);

            $.ajax({
                type: "PUT",
                url: "/user/update",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(thisUser),
                success: function (response) {
                    console.log(response);
                    if (response.success === true) {
                        editBtn.text('Edit');
                        editBtn.removeClass('btn-success');
                        editBtn.addClass('btn-warning');

                        logoutBtn.removeClass('btn-danger');
                        logoutBtn.addClass('btn-secondary');
                        logoutBtn.text('Logout');

                        $('input[name != username]').attr("disabled", "disabled");
                        $('input[name != username]').addClass('text-light');

                        $('#alert').css('color', '#00ff87');
                        $('#alert').text(response.msg);
                        $('#alert').fadeIn();
                        $('#alert').fadeOut(4000);

                    }
                },
                error: function (err) {
                    console.log(err);
                    if (err.success === false) {
                        $('#alert').css('color', '#00ff87');
                        $('#alert').text(response.msg);
                        $('#alert').fadeIn();
                        $('#alert').fadeOut(4000);
                        $('#alert').text('');
                    }
                }
            });

        }

    });

    $('#avatarImg').click(function () {
        $('Input[type = file]').trigger('click');
    });

    $('#avatarInput').on('change', function () {

        let formData = new FormData();
        let avatarFile = $('#avatarInput')[0].files[0];
        formData.append('avatar', avatarFile);
        
        $.ajax({
            url: '/user/uploadAvatar',
            type: 'post',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response.success === true) {
                    $('#alert').css('color', '#00ff87');
                    $('#alert').text(response.msg);
                    $('#alert').fadeIn();
                    setTimeout(() => {
                        location.href = '/user/profile';
                    }, 2000);
                }
            },
            error: function (err) {
                console.log('err', err);
                $('#alert').css('color', '#ff142a');
                $('#alert').text('Avatar could not be uploaded');
                $('#alert').fadeIn();
                $('#alert').fadeOut(4000);
            },
        });
    });
});