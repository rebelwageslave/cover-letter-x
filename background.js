chrome.contextMenus.create({"title": "Paste cover letter", "contexts":["all"], id: "paste_cover_letter"});

chrome.contextMenus.onClicked.addListener(function(info, tab) {

    chrome.storage.sync.get(["coverLetter"], function (data) {
       var template = data.coverLetter
        if ( ! template ) {
            return;
        }
        chrome.storage.sync.get("variableList", function (data2) {
            var variables = data2.variableList
            if ( ! Array.isArray(variables) ) {
                return;
            }
            for ( let variable of variables ) {
                template = template.replace(variable.find, variable.replace)
            }
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {coverLetter:template});
            });
        })

    })
});