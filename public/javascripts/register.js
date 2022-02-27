$(document).ready(function () {

    const inputsInfo = [{
        id: 'firstName',
        regex: /^[a-z]{3,16}$/ig,
        msg: 'The first name can only contain letters.'
    }, {
        id: 'lastName',
        regex: /^[a-z]{3,16}$/ig,
        msg: 'The last name can only contain letters.'
    }, {
        id: 'username',
        regex: /^[a-z0-9_-]{2,16}$/ig,
        msg: 'Username can only contain numbers and letters.'
    }, {
        id: 'email',
        regex: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/ig,
        msg: 'Email address is invalid.'
    }, {
        id: 'phoneNumber',
        regex: /^(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/,
        msg: 'Phone number is invalid.'
    }, {
        id: 'password',
        regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,16}$/,
        msg: 'Password must be at least 8 characters long.'
    }, {
        id: 'confirmPassword',
        // regex: "dd",
        msg: 'Password not matched'
    }, {
        id: 'gender',
        regex: /[male|female]/,
        msg: 'Select your gender male or female'
    }];




    function validator(userObject, inputsInfoArray) {
        let msg = [];

        for (const field in userObject) {
            let inputDetails = inputsInfoArray.filter((e) => e.id === field);

            if (userObject[field] === '') {
                msg.push(`${field} can not be empty`);
            } else {
                if (field !== 'confirmPassword') {
                    let pattern = new RegExp(inputDetails[0].regex);

                    let validity = pattern.test(userObject[field]);
                    console.log(field, validity);

                    if (validity) {
                        continue;
                    } else {
                        msg.push(inputDetails[0].msg);
                    }
                }

                if (userObject[field] !== userObject['password']) {
                    msg.push(inputDetails[0].msg);
                } else {
                    continue;
                }


            }
        }
        return msg;
    }


    $('#submitBtn').click(function (e) {
        e.preventDefault();

        $('#msg').text('');

        let thisUser = {};

        thisUser.firstName = $('#firstName').val();
        thisUser.lastName = $('#lastName').val();
        thisUser.username = $('#username').val();
        thisUser.email = $('#email').val();
        thisUser.phoneNumber = $('#phoneNumber').val();
        thisUser.password = $('#password').val();
        thisUser.confirmPassword = $('#confirmPassword').val();
        thisUser.gender = $('#gender').val();

        // console.log(thisUser);

        let validatorResult = validator(thisUser, inputsInfo);

        console.log(validatorResult);

        console.log(validatorResult.length);

        if (validatorResult.length > 0) {
            
            $('#msg').fadeIn();
            for (const msg of validatorResult) {
                $('#msg').append(msg, '<br/>');
            }
            $('#msg').fadeOut(5000);


        } else {

            $.ajax({
                type: "POST",
                url: 'http://localhost:5005/auth/register',
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(thisUser),
                success: function (response) {
                    console.log(response);
                    if (response.success === true) {
                        $('#msg').removeClass('text-danger');
                        $('#msg').addClass('text-success');
                        $('#msg').fadeIn();
                        $('#msg').text(response.msg);

                        setTimeout(() => {
                            location.href = 'http://localhost:5005/auth/login'
                        }, 2000)

                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });

        }
    });

});