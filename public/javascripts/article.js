$(document).ready(function () {


    $('#articleImage-btn').click(function () {
        $('#articleImageInput').trigger('click');
    });


    $('#articleImageInput').on('change', function () {

        let formData = new FormData();
        let articleImageFile = $('#articleImageInput')[0].files[0];
        formData.append('articleImage', articleImageFile);
        // console.log(articleImageFile);
        $.ajax({
            url: '/article/uploadArticleImage',
            type: 'post',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response.success === true) {
                    const objectURL = URL.createObjectURL(articleImageFile)
                    console.log(objectURL);
                    $('#tempImage').removeClass('d-none');
                    $('#tempImage').attr('src', objectURL);

                }
            },
            error: function (err) {
                console.log('err', err);
            },
        });
    });


    $('#createArticle-btn').click(function () {
        $('#editor-form').submit()
    });


    $('#myArticles-btn').click(function (e) {
        location.href = '/article/myArticles';
    });


    $('#allArticles-btn').on('click', function () {
        location.href = '/article/allArticles';
    });


    $('.more-btn').on('click', function (el) {
        let articleId = $(el.target).attr('articleId');
        location.href = `/article/articles/${articleId}`
    });

});