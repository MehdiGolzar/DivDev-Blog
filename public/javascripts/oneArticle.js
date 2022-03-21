$(document).ready(function () {


    let articleImageSrc = $('#articleImage').attr('src');
    let articleTitle = $('#articleTitle').text();
    let articleContent = $('#articleContent').text();


    let editArticleImagePreview = $('#editArticleImagePreview');
    let editArticleTitle = $('#editArticleTitle');
    let editArticleContent = $('#editArticleContent');

    let articleId = $('#editArticleBtn').attr('articleId');

    $('#editArticleBtn').click(function (e) {
        e.preventDefault();

        editArticleImagePreview.attr('src', articleImageSrc);
        editArticleTitle.val(articleTitle);
        editArticleContent.val(articleContent);

    });

    $('#editArticleImagePreview').click(function () {
        console.log('0k');
        $('#editArticleImageInput').trigger('click');
    });

    $('#editArticleImageInput').change(function (e) {
        e.preventDefault();
        let articleImageFile = $('#editArticleImageInput')[0].files[0];
        const imagePreviewSrc = URL.createObjectURL(articleImageFile);

        $('#editArticleImagePreview').removeClass('d-none');
        $('#editArticleImagePreview').attr('src', imagePreviewSrc);

    });

    $('#saveArticleBtn').click(function (e) {
        e.preventDefault();

        let imageFormData = new FormData();
        let articleImageFile = $('#editArticleImageInput')[0].files[0];
        imageFormData.append('articleImage', articleImageFile);

        $.ajax({
            url: `/article/uploadArticleImage/${articleId}`,
            type: 'post',
            data: imageFormData,
            contentType: false,
            processData: false,
            success: function (response) {

                console.log(response);

            },
            error: function (err) {
                console.log('err', err);

            }
        });


        const updatedArticle = {
            updatedTitle: editArticleTitle.val(),
            updatedContent: editArticleContent.val()
        }

        $.ajax({
            url: `/article/${articleId}`,
            type: 'put',
            data: JSON.stringify(updatedArticle),
            contentType: "application/json",
            dataType: "json",
            success: function (response) {

                console.log(response);

                if (response.success === true) {
                    location.href = `/article/articles/${articleId}`
                }

            },
            error: function (err) {
                console.log('err', err);

            }
        });


    })


});