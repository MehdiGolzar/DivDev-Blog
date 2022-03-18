$(document).ready(function () {

    // Ftech editAccess to disable or enable Edit Button
    let editArticleBtn = $('#editArticlBtn')
    let saveArticlBtn = $('#saveArticlBtn')


    editArticleBtn.click(function (e) {
        e.preventDefault();

        let articleImage = $('#articleImage');
        let articleImageSrc = articleImage.attr('src');
        let articleTitle = $('#articleTitle');
        let articleContent = $('#articleContent');

        if (editArticleBtn.text() === 'Edit') {

            // Article Buttons
            editArticleBtn.text('Cancel')
            saveArticlBtn.removeClass('d-none');

            // Article Image
            let imageInput = `<input type="file" class="d-none" id="imageInput">`;
            $("#imagePreviewContainer").append(imageInput);

            articleImage.click(function () {
                $('#imageInput').trigger('click');
            });

            $('#imageInput').on('change', function () {
                articleImage.addClass('d-none');

                let formData = new FormData();
                let imageFile = $('#imageInput')[0].files[0];
                formData.append('articleImage', imageFile);
                const objectURL = URL.createObjectURL(imageFile);
               
                articleImage.attr('src', objectURL);
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
            articleImage.attr('src', articleImageSrc);
            imageInput.remove();

            // Article Title
            articleTitle.removeClass('d-none');
            titleInput.remove();

            // Article Content
            articleContent.removeClass('d-none');
            contentTextarea.remove();

        }


        saveArticlBtn.click(function (e) { 
            e.preventDefault();

            const updateArticle = {
                
            }
            
        });












    });

});