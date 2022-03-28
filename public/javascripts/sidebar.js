$(document).ready(function () {

  $('#dashboardBtn').on('click', function () {
    let role = $('#role').text();
    if (role === 'admin') {
      location.href = '/admin/dashboard';
    } else {
      location.href = '/user/dashboard';
    }
  });

  // Create articles button
  $('#newArticleBtn').click(function (e) {
    e.preventDefault();

    let createArticleModal = `<div class="modal fade" id="createArticleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="createArticleModalLabel" aria-hidden="true">
    
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">

        <!-- Modal header -->
        <div class="modal-header text-center">
          <h3 class="modal-title" id="createArticleModalLabel">Write Your Article</h3>
        </div>

        <!-- Modal body -->
        <div class="modal-body">

          <!-- Article image -->
          <div class="row justify-content-end">
            <div class="col-10  w-25">
              <img src="/articles/article_default_image.png" class="img-fluid" id="articleImagePreview">
              <input type="file" class="d-none" id="articleImageInput">
            </div>
            <div class="col-2 d-flex flex-column justify-content-center">
              <button class="btn btn-primary py-2 mb-2" id="selectImageBtn">Select image</button>
              <button class="btn btn-danger" id="deSelectImageBtn">Delete image</button>
            </div>
          </div>

          <!-- Article title -->
          <div class="mb-3">
            <input type="text" class="form-control text-light" id="articleTitleInput" placeholder="Title">
          </div>

          <!-- Article content -->
          <div class="mb-3">
            <textarea class="form-control text-light articleContent" id="articleContentTextarea"></textarea>
          </div>
        </div>

        <div class="modal-footer">
          <div class="d-flex flex-grow justify-content-between">
            <button type="button" class="btn btn-secondary" id="cancelBtn" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" id="createArticleBtn">Create</button>
          </div>
        </div>
      </div>
    </div>
  </div>`;

    $('body').append(createArticleModal);

    $('#createArticleModal').modal('show');
  });


  // My articles button
  $('.my-articles-btn').click(function (e) {
    location.href = '/article/myArticles';
  });


  // All articles button
  $('#allArticlesBtn').on('click', function () {
    location.href = '/article/allArticles';
  });


});