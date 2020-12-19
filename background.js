chrome.contextMenus.create({"title": "Paste cover letter", "contexts":["all"], id: "paste_cover_letter"});

chrome.contextMenus.onClicked.addListener(function(info, tab) {

    chrome.storage.sync.get(["coverLetter"], function (data) {
       var template = data.coverLetter
        chrome.storage.sync.get("variableList", function (data2) {
            var variables = data2.variableList
            console.log(template)
            console.log(variables)
        })

    })
});