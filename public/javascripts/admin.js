$(document).ready(function () {

    const usersListTable = `<div class="col-12 grid-margin">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Order Status</h4>
        <div class="table-responsive">
          <table class="table" id="userslistTable">
            <thead>
              <tr>
                <th> Full Name </th>
                <th> Username </th>
                <th> Email </th>
                <th> Phone Number </th>
                <th> Gender </th>
                <th> Articles </th>
                <th> Registered in </th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>`;


//     let userTr = `<tr>
//     <td>
//       <img src="http://localhost:5005/images/avatars/${userAvatar}">
//       <span class="ps-2"> ${userFirstName} ${userLastName} </span>
//     </td>
//     <td> ${userUsername} </td>
//     <td> ${userEmail} </td>
//     <td> ${userPhoneNumber} </td>
//     <td> ${userGender} </td>
//     <td> ${userArticles} </td>
//     <td>
//       <div class="badge badge-outline-primary">Actions</div>
//     </td>
//   </tr>`
    
 

    $('#usersListBtn').click(function (e) { 
        e.preventDefault();
        console.log('0K');

        $.ajax({
            type: "GET",
            url: "/admin/getUsers",
            dataType: "json",
            success: function (response) {
                console.log(response);
            },
            error: function (err) {
                console.log(err);
            }
        });




        // $('#usersListContainer').toggleClass('d-none', '');
        // $('#usersListContainer').append(usersListTable);

    });







});