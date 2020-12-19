chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    let coverLetter = request.coverLetter
    var input = document.activeElement;
    if (input.tagName == "INPUT" || input.tagName == "TEXTAREA")
    {
        input.value = coverLetter
    }
})