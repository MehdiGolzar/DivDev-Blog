$(document).ready(function () {


    $('#articleImageBtn').click(function () {
        $('#articleImageInput').trigger('click');
    });


    $('#articleImageInput').on('change', function () {

        
        // formData.append('articleImage', articleImageFile);
        // formData.append('articleImage', articleImageFile);
        // formData.append('articleImage', articleImageFile);

        // console.log(articleImageFile);
        // $.ajax({
        //     url: '/article/uploadArticleImage',
        //     type: 'post',
        //     data: formData,
        //     contentType: false,
        //     processData: false,
        //     success: function (response) {
        //         if (response.success === true) {
        //             const objectURL = URL.createObjectURL(articleImageFile);
        //             console.log(objectURL);
        //             $('#tempImage').removeClass('d-none');
        //             $('#tempImage').attr('src', objectURL);

        //         }
        //     },
        //     error: function (err) {
        //         console.log('err', err);
        //     },
        // });
    });


    $('#createArticleBtn').click(function () {
        // $('#articleForm').submit()

        let formData = new FormData();
        let articleImageFile = $('#articleImageInput')[0].files[0];
        formData.append('articleImage', articleImageFile);

        $.ajax({
            url: '/article/',
            type: 'post',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response.success === true) {
                    const objectURL = URL.createObjectURL(articleImageFile);
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


    $('#myArticlesBtn').click(function (e) {
        location.href = '/article/myArticles';
    });


    $('#allArticlesBtn').on('click', function () {
        location.href = '/article/allArticles';
    });


    $('.moreBtn').on('click', function (el) {
        let articleId = $(el.target).attr('articleId');
        location.href = `/article/articles/${articleId}`
        // $.ajax({
        //     type: "POST",
        //     url: "url",
        //     data: "data",
        //     dataType: "dataType",
        //     success: function (response) {
                
        //     }
        // });
    });

});