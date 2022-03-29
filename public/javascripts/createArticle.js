$(document).ready(function () {

    // Select image for article
    $('body').on('click', '#selectImageBtn', function () {
        $('#articleImageInput').trigger('click');
    });

    // Show selected image
    $('body').on('change', '#articleImageInput', function (e) {
        e.preventDefault();

        let articleImageFile = $('#articleImageInput')[0].files[0];
        const imagePreviewSrc = URL.createObjectURL(articleImageFile);

        $('#articleImagePreview').attr('src', imagePreviewSrc);
    });

    // Deselecte image
    $('body').on('click', '#deSelectImageBtn', function () {
        $('#articleImagePreview').attr('src', '/articles/article_default_image.png');
    });

    // Send requset to server for Create article
    $('body').on('click', '#createArticleBtn', function () {

        let articleImageFile = $('#articleImageInput')[0].files[0];

        if (!!articleImageFile) {

            let imageFormData = new FormData();
            imageFormData.append('articleImage', articleImageFile);

            $.ajax({
                url: `/article/uploadArticleImage`,
                type: 'POST',
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
        }

        const newArticle = {
            articleTitle: $('#articleTitleInput').val(),
            articleContent: $('#articleContentTextarea').val()
        }

        $.ajax({
            url: `/article/`,
            type: 'POST',
            data: JSON.stringify(newArticle),
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                console.log(res);

                if (res.success === true) {
                    // let userRole = $('#role').text();
                    // if (userRole === 'blogger') {
                    //     return location.href = `/user/dashboard`;
                    // }
                    // return location.href = `/admin/dashboard`;
                    return location.reload();
                }
            },
            error: function (err) {
                console.log('err', err);

            }
        });

    });

});