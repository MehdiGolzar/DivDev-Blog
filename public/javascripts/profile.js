$(document).ready(function () {

    let editBtn = $('#editBtn');
    let logoutBtn = $('#logoutBtn')

    editBtn.click(function (e) {
        e.preventDefault();

        if (editBtn.text() === 'Edit') {
            editBtn.removeClass('btn-warning');
            editBtn.addClass('btn-success');
            editBtn.text('Save');

            logoutBtn.removeClass('btn-warning');
            logoutBtn.addClass('btn-danger');
            logoutBtn.text('Delete');
            logoutBtn.attr('href', '/user/delete');

            $('input[name != username]').removeAttr('disabled');
            $('input[name != username]').removeClass('text-light');

            $('input[type = file]').removeAttr('disabled');


        } else {


            const thisUser = {};
            thisUser.firstName = $('#firstName').val();
            thisUser.lastName = $('#lastName').val();
            thisUser.email = $('#email').val();
            thisUser.phoneNumber = $('#phoneNumber').val();
            console.log(thisUser);
            $.ajax({
                type: "PUT",
                url: "http://localhost:5005/user/update",
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
                        logoutBtn.attr('href', '/auth/logout');

                        $('input[name != username]').attr("disabled", "disabled");
                        $('input[name != username]').addClass('text-light');
                        $('#alert').text(response.msg);
                        $('#alert').fadeOut(3000);


                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });

        }

    });

    $('#avatar').click(function(){ $('#imgInput').trigger('click'); });
 

});