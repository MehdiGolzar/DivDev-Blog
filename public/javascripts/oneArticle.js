// Ftech editAccess to disable or enable Edit Button

$('#editArticle-btn').click(function (e) {
    e.preventDefault();

    let articleImage = $('#articleImage');
    let articleTitle = $('#articleTitle');
    let articleContent = $('#articleContent');

    // $(articleImage).attr('src');
    // $(articleTitle).attr('src');
    // $(articleImage).attr('src');


    $(articleTitle).addClass('d-none');
    let titleInput = `<input id="titleInput" value=${articleTitle.text()}></input>`;
    $("#title-container").append(titleInput);
    console.log(articleTitle.text());


    $(articleContent).addClass('d-none');
    let contentTextarea = `<textarea id="contentTextarea" value=${articleContent.text()}></textarea>`;
    $("#title-container").append(contentTextarea);



});