$(document).ready(function () {

    const firstName = $('#firstName').val();
    const lastName = $('#lastName').val();
    const email = $('#email').val();
    const phoneNumber = $('#phoneNumber').val();
    const gender = $('#gender').val();

    let editBtn = $('#editBtn');
    let logoutBtn = $('#logoutBtn')

    const username = $('#username').val();
    let requsetURL = 'user';
    if (username === 'admin') {
        requsetURL = 'admin';
    }

    // Request to delete user
    $('#deleteUserBtn').click(function (e) {
        e.preventDefault();

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

    });


    $('#editUserBtn').click(function (e) {
        e.preventDefault();





        $('#logoutBtn').addClass('d-none');
        $('#editUserBtn').addClass('d-none');
        $('#updateUserBtn').removeClass('d-none');
        $('#cancelBtn').removeClass('d-none');
        if (username !== 'admin') {
            $('#deleteUserBtn').removeClass('d-none');
        }

        $('input[name != username]').removeAttr('disabled');
        $('#gender').removeAttr('disabled');
        $('input[name != username]').removeClass('text-light');

        $('#selectAvatarBtn').removeClass('d-none');
        $('#deleteAvatarBtn').removeClass('d-none');
    });


    $('#updateUserBtn').click(function (e) {
        e.preventDefault();

        // Ajax to upload avatar
        let avatarFile = $('#avatarInput')[0].files[0];

        // Check to if avatar file exists then send request
        if (!!avatarFile) {

            let avatarformData = new FormData();
            avatarformData.append('avatar', avatarFile);

            $.ajax({
                url: `/${requsetURL}/uploadAvatar`,
                type: 'post',
                data: avatarformData,
                contentType: false,
                processData: false,
                success: function (res) {
                    console.log(res);
                },
                error: function (err) {
                    console.log('err', err);
                },
            });
        }


        const thisUser = {
            id: $('#username').attr('userId'),
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            email: $('#email').val(),
            phoneNumber: $('#phoneNumber').val(),
            gender: $('#gender').val(),
        }

        if (thisUser.firstName !== firstName || thisUser.lastName !== lastName || thisUser.email !== email || thisUser.phoneNumber !== phoneNumber || thisUser.gender !== gender) {

            // Request to update user
            $.ajax({
                type: "PUT",
                url: `/${requsetURL}`,
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(thisUser),
                success: function (res) {
                    if (res.success === true) {
                        $('#logoutBtn').removeClass('d-none');
                        $('#editUserBtn').removeClass('d-none');
                        $('#updateUserBtn').addClass('d-none');
                        $('#cancelBtn').addClass('d-none');
                        $('#deleteUserBtn').addClass('d-none');
                        $('#selectAvatarBtn').addClass('d-none');
                        $('#deleteAvatarBtn').addClass('d-none');

                        $('input[name != username]').attr("disabled", "disabled");
                        $('input[name != username]').addClass('text-light');

                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });


        }

    });


    // Select avatar button
    $('#selectAvatarBtn').click(function () {
        $('#avatarInput').trigger('click');
    });

    // Deselect avatar button
    // $('#deleteAvatarBtn').click(function () {

    //     let avatarFile = '/avatars/default_avatar.png';
    //     const avatarPreviewSrc = URL.createObjectURL(avatarFile);

    //     $('#avatarPreview').attr('src', avatarPreviewSrc);

    // });

    // Show seleced avatar
    $('#avatarInput').on('change', function () {

        let avatarFile = $('#avatarInput')[0].files[0];
        const avatarPreviewSrc = URL.createObjectURL(avatarFile);

        $('#avatarPreview').attr('src', avatarPreviewSrc);
    });


    $('#cancelBtn').click(function (e) {
        e.preventDefault();

    });

    $('#backToDashboardBtn').click(function (e) {
        e.preventDefault();
        location.href = `/${requsetURL}/dashboard`;
    });
});