var Background = function () {
    this.initialize();
};

Background.prototype = {
    initialize: function() {
        this.assignEventHandlers();
        this.createContextMenus();
    },

    assignEventHandlers: function () {
        var that = this;
        chrome.contextMenus.onClicked.addListener(function (info) {
            that.onClickContextMenu(info);
        });
    },

    createContextMenus: function () {
        chrome.contextMenus.create({
            id: "contextMenu_pyazo_post",
            type: "normal",
            title: "Post image to Pyazo",
            contexts: ["image"]
        });
    },

    onClickContextMenu: function (info) {
        var id = info.menuItemId;
        if (id === "contextMenu_pyazo_post") {
            this.onClickPost(info);
        }
    },

    onClickPost: function (info) {
        var pyazoUrl = "http://pyazo.hachiojipm.org/";
        var preparePostImage = function () {
            var dfd = $.Deferred();
            $.ajax({
                url: pyazoUrl,
                type: "post",
                contentType: "application/x-www-form-urlencoded",
                datatype: "text",
                data: {
                    "fileurl": info.srcUrl
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
            alert("Post Failed...");
        });
    }
};

var background = new Background();
