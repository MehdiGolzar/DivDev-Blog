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
                <th> Registered in </th>
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
          console.log(res);
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
                <div class="btn btn-outline-primary" userId="${user._id}">Reset Pass</div>
                <div class="btn btn-outline-danger delete-user-btn" userId="${user._id}">Delete</div>
                </td>
              </tr>`;

              $('#tbody').append(userTr);
            }

          } else {
            $('#usersListContainer').append(`<p>${res.msg}</p>`)
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
  
  let userId = $(e.target).attr('userId');
  console.log(userId);

  $.ajax({
    type: "DELETE",
    url: `/admin/${userId}`,
    dataType: "json",
    success: function (res) {
      console.log(res);
    },
    error: function (err) {
      console.log(err);
    }
  });
  
});



});