$(document).ready(function () {

    let articleId = $('#editArticleBtn').attr('articleId');

    // Check user access for edit article
    let editArticleAccess = $('#editArticleBtn').attr('editArticleAccess');

    if (editArticleAccess === 'true') {
        $('#editArticleBtn').removeClass('d-none')
    }

    // Check user access for delete comment
    let deleteCommentButtons = $('.comment-trash-btn');

    for (const btn of deleteCommentButtons) {
        const deleteCommentAccess = $(btn).attr('deletecommentaccess')
        if (deleteCommentAccess === 'true') {
            $(btn).removeClass('d-none')
        }
    }




    // Edit articles button
    $('#editArticleBtn').click(function (e) {
        e.preventDefault();

        let editArticleModal = `<div class="modal fade" id="editArticleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="editArticleModalLabel" aria-hidden="true">
    
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">

        <!-- Modal header -->
        <div class="modal-header text-center">
          <h3 class="modal-title" id="editArticleModalLabel">Write Your Article</h3>
        </div>

        <!-- Modal body -->
        <div class="modal-body">

          <!-- Article image -->
          <div class="row justify-content-end">
            <div class="col-10  w-25">
              <img src="/articles/article_default_image.png" class="img-fluid" id="editArticleImagePreview">
              <input type="file" class="d-none" id="editArticleImageInput">
            </div>
            <div class="col-2 d-flex flex-column justify-content-center">
              <button class="btn btn-primary py-2 mb-2" id="selectImageBtn">Select image</button>
              <button class="btn btn-danger" id="deSelectImageBtn">Delete image</button>
            </div>
          </div>

          <!-- Article title -->
          <div class="mb-3">
            <input type="text" class="form-control text-light" id="editArticleTitleInput" placeholder="Title">
          </div>

          <!-- Article content -->
          <div class="mb-3">
            <textarea class="form-control text-light articleContent" id="editArticleContentTextarea"></textarea>
          </div>
        </div>

        <!-- Modal footer -->
        <div class="modal-footer">
        <div class="d-flex flex-grow justify-content-between">
        <div>
          <button type="button" class="btn btn-danger" id="deleteArticleBtn">Delete</button>
        </div>
        <div>
          <button type="button" class="btn btn-secondary" id="cancelBtn" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" id="saveArticleBtn">Save</button>
        </div>
      </div>

        </div>
      </div>
    </div>
  </div>`;

        $('body').append(editArticleModal);


        let articleImageSrc = $('#articleImage').attr('src');
        let articleTitle = $('#articleTitle').text();
        let articleContent = $('#articleContent').text();


        // Put article date in edit article modal
        $('#editArticleImagePreview').attr('src', articleImageSrc);
        $('#editArticleTitleInput').val(articleTitle);
        $('#editArticleContentTextarea').val(articleContent);

        $('#editArticleModal').modal('show');
    });


    // Select image for article
    $('body').on('click', '#selectImageBtn', function () {
        $('#editArticleImageInput').trigger('click');
    });

    // Show selected image
    $('body').on('change', '#editArticleImageInput', function (e) {
        e.preventDefault();

        let editArticleImageFile = $('#editArticleImageInput')[0].files[0];
        const imagePreviewSrc = URL.createObjectURL(editArticleImageFile);

        $('#editArticleImagePreview').attr('src', imagePreviewSrc);
    });

    // Deselecte image
    $('body').on('click', '#deSelectImageBtn', function () {
        $('#editArticleImagePreview').attr('src', '/articles/article_default_image.png');
    });

    // Save article changes
    $('body').on('click', '#saveArticleBtn', function (e) {
        e.preventDefault();

        let imageFormData = new FormData();
        let articleImageFile = $('#editArticleImageInput')[0].files[0];
        imageFormData.append('articleImage', articleImageFile);

        $.ajax({
            url: `/article/updateArticleImage/${articleId}`,
            type: 'post',
            data: imageFormData,
            contentType: false,
            processData: false,
            success: function (res) {
                console.log(res);
            },
            error: function (err) {
                console.log('err', err);

            }
        });


        const updatedArticle = {
            updatedTitle: $('#editArticleTitleInput').val(),
            updatedContent: $('#editArticleContentTextarea').val()
        }

        $.ajax({
            url: `/article/${articleId}`,
            type: 'PUT',
            data: JSON.stringify(updatedArticle),
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                console.log(res);
                if (res.success === true) {
                    location.reload();
                }
            },
            error: function (err) {
                console.log('err', err);
            }
        });
    });


    // Delete article
    $('body').on('click', '#deleteArticleBtn', function (e) {
        e.preventDefault();

        $.ajax({
            type: "DELETE",
            url: `/article/${articleId}`,
            success: function (response) {
                console.log(response);
                if (response.success === true) {
                    location.href = '/article/myArticles'
                }
            },
            error: function (err) {
                console.log('err', err);
            }
        });
    });


    // Create a comment
    $('#commentInput').keyup(function (event) {

        if (event.keyCode === 13) {
            event.preventDefault();

            let commentContent = $('#commentInput').val();

            let newComment = {
                content: commentContent,
                articleId: articleId
            }

            $.ajax({
                type: "post",
                url: "/comment",
                data: JSON.stringify(newComment),
                contentType: "application/json",
                dataType: "json",
                success: function (res) {
                    console.log(res);
                    if (res.success === true) {
                        location.href = `/article/${articleId}`
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });

        }
    });

    // Delete a comment
    $('body').on('click', '.comment-trash-btn', function (e) {
        e.preventDefault();

        const targetCommentId = $(e.currentTarget).attr('commentId')
        console.log(targetCommentId);

        $.ajax({
            type: "DELETE",
            url: `/comment/${targetCommentId}`,
            success: function (res) {
                if (res.success === true) {
                    location.reload();
                }
            }
        });
    });
});