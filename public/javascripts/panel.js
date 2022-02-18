$(document).ready(function () {
    let showUserBtn = $('#showUserBtn');

    showUserBtn.click(function (e) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: "http://localhost:5005/admin/getUsers",
            dataType: "json",
            success: function (response) {
                console.log(response);
                if (response.success === true) {
                    for (let i = 0; i < response.data.length; i++) {
                        const element = response.data[i];
                        
                        $('#result').append(`Username:  ${element.username}, First Name: ${element.firstName}, Last Name: ${element.lastName}, Email: ${element.email}, Phone Number: ${element.phoneNumber}\n`);
                    }
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    });






});