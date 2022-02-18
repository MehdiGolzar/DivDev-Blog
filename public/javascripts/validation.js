$(document).ready(function () {

    // const inputs = [{
    //     id: 'firstName',
    //     regex: /^[a-z]{3,16}$/ig,
    //     msg: 'The first name can only contain letters.'
    // }, {
    //     id: 'lastName',
    //     regex: /^[a-z]{3,16}$/ig,
    //     msg: 'The last name can only contain letters.'
    // }, {
    //     id: 'username',
    //     regex: /^[a-z0-9_-]{2,16}$/ig,
    //     msg: 'Username can only contain numbers and letters.'
    // }, {
    //     id: 'email',
    //     regex: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/ig,
    //     msg: 'Must be a valid email address.'
    // }, {
    //     id: 'phoneNumber',
    //     regex: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/ig,
    //     msg: 'Must be a valid phone number.'
    // }, {
    //     id: 'password',
    //     regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,16}$/,
    //     msg: 'Password must be at least 8 characters long.'
    // }, {
    //     id: 'confirmPassword',
    //     regex: "dd",
    //     msg: 'Password not matched'
    // }, {
    //     id: 'gender',
    //     regex: /[male|female]/,
    //     msg: 'Select male or female'
    // }];




    // function validator(input) {
    //     if (getValue(input.id) === " ") {
    //         return false;
    //     } else {
    //         let pattern = new RegExp(input.regex);
    //         return pattern.test(getValue(input.id));
    //     };
    // };


    // $('#form').submit(function (e) {
    //     e.preventDefault();
    //     let msg = ``;
    //     // let errorCounter = 0;

    //     console.log(getValue(inputs[5].id));
    //     console.log(getValue(inputs[0].id));


    //     // let validFirstName = validator(inputs[0]);
    //     // if (!validFirstName) {
    //     //     console.log(inputs[0].msg);
    //     // }

    //     for (const input of inputs) {

    //         let validInput = validator(input);

    //         if (validInput) {

    //             blogger[`${input.id}`] = getValue(input.id);

    //         } else {
    //             msg.concat(input.msg);
    //         }


    //     }


    //     console.log(msg);

    //     console.log(blogger);


    // });

    $('#form').click(function (e) {
        e.preventDefault();

        function getValue(id) {
            return document.getElementById(id).value;
        }

        const USER = {
            firstName: getValue('firstName'),
            lastName: getValue('lastName'),
            username: getValue('username'),
            email: getValue('email'),
            phoneNumber: getValue('phoneNumber'),
            password: getValue('password'),
            gender: getValue('gender')
        }

        $.ajax({
            type: 'post',
            url: 'https://localhost:5005/auth/register',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(USER),
            processData: false,
            success: function (res, textStatus, jQxhr) {
                console.log(textStatus);
                $('#msg').html(JSON.parse(res));
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    });

});