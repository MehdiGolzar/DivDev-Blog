$(document).ready(function () {

   $('.more-btn').on('click', function (el) {
       let articleId = $(el.target).attr('articleId');
       location.href = `/article//articles/${articleId}`
   });

});