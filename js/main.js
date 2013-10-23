chrome.contextMenus.create({
    title: "Post image to Pyazo",
    contexts:["image"],
    onclick: function(info) {
        alert(info.srcUrl);
    }
});
