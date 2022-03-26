$(document).ready(function () {

    $('#dashboard-btn').on('click', function () {
        let role = $('#role').text();
        if (role === 'admin') {
            location.href = '/admin/dashboard';
        } else {
            location.href = '/user/dashboard';
        }
    });


    $('.create-article-btn').click(function (e) {
        e.preventDefault();

        let createArticleModal = `  <div class="modal fade" id="createArticleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="createArticleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
    
            <div class="modal-header text-center">
              <h3 class="modal-title" id="createArticleModalLabel">Write Your Article</h3>
            </div>
    
            <div class="modal-body">
    
              <!-- image -->
              <div id="imageContainer text-center">
                <img src="/articles/article_default_image.png" id="articleImagePreview">
                <input type="file" class="d-none" id="articleImageInput">
              </div>
    
              <!-- title -->
              <div class="mb-3">
                <input type="text" class="form-control text-light" id="articleTitleInput" placeholder="Title">
              </div>
    
              <!-- content -->
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
      </div>`


        $('body').append(createArticleModal);

        $('#createArticleModal').modal('show');
    });





});