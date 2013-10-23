chrome.contextMenus.create({
    title: "Post image to Pyazo",
    contexts:["image"],
    onclick: function(info) {
        pyazoPost(info.srcUrl);
    }
});

function pyazoPost(imageUrl) {
    var pyazoUrl = "http://yairc.cfe.jp:5000/"
    var preparePostImage = function () {
        var dfd = $.Deferred();
        $.ajax({
            url: pyazoUrl,
            type: "post",
            contentType: "application/x-www-form-urlencoded",
            datatype: "text",
            data: {
                "fileurl": imageUrl
            },
            crossDomain: true,
            success: function (response) {
                dfd.resolve(response);
            },
            error: function () {
                dfd.reject();
            }
        });
        return dfd.promise();
    };

    preparePostImage().done(function (responseUrl) {
        // url goes to clipboard
        var copyArea = $("<textarea/>");
        copyArea.text(responseUrl);
        $("body").append(copyArea);
        copyArea.select();
        document.execCommand("copy");
        copyArea.remove();

        window.open(responseUrl); // show page
    }).fail(function () {
        alert("ごめん、なんかしくじった");
    });
};
