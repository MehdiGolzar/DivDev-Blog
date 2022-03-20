$(document).ready(function () {

    // Ftech editAccess to disable or enable Edit Button
    let editArticleBtn = $('#editArticlBtn')
    let saveArticlBtn = $('#saveArticlBtn')


    editArticleBtn.click(function (e) {
        e.preventDefault();

        let articleImage = $('#articleImage');
        let articleTitle = $('#articleTitle');
        let articleContent = $('#articleContent');

        if (editArticleBtn.text() === 'Edit') {

            // Article Buttons
            // editArticleBtn.text('Cancel')
            // saveArticlBtn.removeClass('d-none');

            // Article Image
            let imageInput = `<input type="file" class="d-none" id="imageInput">`;
            $("#imageContainer").append(imageInput);

            articleImage.click(function () {
                $('#imageInput').trigger('click');
            });

            $('#imageInput').on('change', function () {


                let formData = new FormData();
                let imageFile = $('#imageInput')[0].files[0];
                formData.append('articleImage', imageFile);
                const objectURL = URL.createObjectURL(imageFile);


                articleImage.addClass('d-none');
                let imagePreview = `<img src=${objectURL} id="imagePreview">`;
                $("#imageContainer").append(imagePreview);


            })


            // Article Title
            articleTitle.addClass('d-none');
            let titleInput = `<input type="text" id="titleInput" value=${articleTitle.text()}>`;
            $("#titleContainer").append(titleInput);


            // Article Content
            $(articleContent).addClass('d-none');
            let contentTextarea = `<textarea id="contentTextarea" rows="20" value=${articleContent.text()}></textarea>`;
            $("#contentContainer").append(contentTextarea);


        } else {

            // Article Buttons
            editArticleBtn.text('Edit')
            saveArticlBtn.addClass('d-none');

            // Article Image
            articleImage.removeClass('d-none');
            imageInput.remove();
            imagePreview.remove();



            // Article Title
            articleTitle.removeClass('d-none');
            titleInput.remove();

            // Article Content
            articleContent.removeClass('d-none');
            contentTextarea.remove();

        }


        saveArticlBtn.click(function (e) {
            e.preventDefault();

            // const updateArticle = {
            //     updatedTitle: articleTitle.val(),
            //     updatedContent: articleTitle.val(),
            //     updatedimage: articleimage.val(),

            // }


            let updateFormData = new FormData();
            let updateImage = $('#imagePreview')[0].files[0];
            updateFormData.append('articleImage', updateImage);
            
            let updateTitle = $('#').val();

            
            $.ajax({
                url: '/user/uploadAvatar',
                type: 'post',
                data: formData,
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response.success === true) {
                        $('#alert').css('color', '#00ff87');
                        $('#alert').text(response.msg);
                        $('#alert').fadeIn();
                        setTimeout(() => {
                            location.href = 'http://localhost:5005/user/dashboard';
                        }, 2000);
                    }
                },
                error: function (err) {
                    console.log('err', err);
                    $('#alert').css('color', '#ff142a');
                    $('#alert').text('Avatar could not be uploaded');
                    $('#alert').fadeIn();
                    $('#alert').fadeOut(4000);
                },
            });

        });












    });

});