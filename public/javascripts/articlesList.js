$(document).ready(function () {

    let deleteArticleAccess = $('.adminDeleteArticleBtn').attr('deleteArticleAccess');
    if (deleteArticleAccess === 'true') {
        $('.adminDeleteArticleBtn').removeClass('d-none');
    }
    
    // Delete Article
    $('.adminDeleteArticleBtn').on('click', function (e) {
        e.preventDefault();
        let articleId = $(e.currentTarget).attr('articleId');

        $.ajax({
            type: "DELETE",
            url: `/article/${articleId}`,
            success: function (response) {
                console.log(response);
                if (response.success === true) {
                    return location.reload();
                }
            },
            error: function (err) {
                console.log('err', err);
            }
        });

    });


});