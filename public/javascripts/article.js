$(document).ready(function () {

    // Select image for article
    $('body').on('click', '#articleImagePreview',function () {
        $('#articleImageInput').trigger('click');
    });

    //  Show selected image
    $('body').on('change', '#articleImageInput', function (e) {
        e.preventDefault();

        let articleImageFile = $('#articleImageInput')[0].files[0];
        const imagePreviewSrc = URL.createObjectURL(articleImageFile);

        // $('#articleImagePreview').removeClass('d-none');
        $('#articleImagePreview').attr('src', imagePreviewSrc);
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
                    let userRole = $('#role').text();
                    if (userRole === 'blogger') {
                        return location.href = `/user/dashboard`;
                    }
                    return location.href = `/admin/dashboard`;
                }
            },
            error: function (err) {
                console.log('err', err);

            }
        });

    });


    $('#myArticlesBtn').click(function (e) {
        location.href = '/article/myArticles';
    });


    $('#allArticlesBtn').on('click', function () {
        location.href = '/article/allArticles';
    });


    $('.moreBtn').on('click', function (el) {
        let articleId = $(el.target).attr('articleId');
        location.href = `/article/${articleId}`
    });

});