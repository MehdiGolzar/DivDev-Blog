$(document).ready(function () {

  let clickCounter = 0;

  const usersListDiv = `<div class="col-12 grid-margin">
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">Users List</h3>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr class="text-center">
                <th> Full Name </th>
                <th> Username </th>
                <th> Email </th>
                <th> Phone Number </th>
                <th> Gender </th>
                <th> Articles </th>
                <th> Tools </th>
              </tr>
            </thead>
            <tbody id="tbody">
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>`;


// Users List
  $('#usersListBtn').click(function (e) {
    e.preventDefault();

    if (clickCounter === 0) {
      clickCounter++

      $.ajax({
        type: "GET",
        url: "/admin/getUsers",
        dataType: "json",
        success: function (res) {
          if (res.success === true) {
            $('#usersListContainer').append(usersListDiv)

            for (const user of res.data) {
              let userTr = `<tr>
                <td>
                <img src="/images/avatars/${user.avatar}">
                <span class="ps-2"> ${user.firstName} ${user.lastName} </span>
                </td>
                <td> ${user.username} </td>
                <td> ${user.email} </td>
                <td> ${user.phoneNumber} </td>
                <td> ${user.gender} </td>
                <td> ${user.articles} </td>
                <td>
                <div class="" userId="${user._id}">
                  <i class="fas fa-unlock h4 text-primary btn reset-password-btn me-1"></i>
                  <i class="fas fa-trash h4 text-danger btn delete-user-btn ms-1"></i>
                </div>
                </td>
              </tr>`;

              $('#tbody').append(userTr);
            }

          } else {
            $('#usersListContainer').append(`<div class="text-center h3 text-warning">${res.msg}</div>`)
          }

        },
        error: function (err) {
          console.log(err);
        }
      });

      $('#usersListContainer').toggleClass('d-none', '');

    } else {
      $('#usersListContainer').toggleClass('d-none', '');
    }

  });


// Delete User
$('#usersListContainer').on("click", ".delete-user-btn", function(e){
  e.preventDefault();
  
  let userId = $(e.target.parentElement).attr('userId');

  $.ajax({
    type: "DELETE",
    url: `/admin/${userId}`,
    dataType: "json",
    success: function (res) {
      if (res.success === true) {
        location.reload();
        console.log('OK');
      }
    },
    error: function (err) {
      console.log(err);
    }
  });
  
});

// Reset user password
$('#usersListContainer').on("click", ".reset-password-btn", function(e){
  e.preventDefault();
  
  let userId = $(e.target.parentElement).attr('userId');

  $.ajax({
    type: "POST",
    url: `/admin/rp/${userId}`,
    dataType: "json",
    success: function (res) {
      if (res.success === true) {
        location.reload();
        console.log('OK');
      }
    },
    error: function (err) {
      console.log(err);
    }
  });
  
});

});