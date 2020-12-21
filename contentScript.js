chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    let coverLetter = request.coverLetter
    var input = document.activeElement;
    if (input.tagName == "INPUT" || input.tagName == "TEXTAREA")
    {
        input.value = coverLetter
        console.log("cover letter pasted")
    }
    else {
        console.log("cover letter not pasted because the target element is not input nor textarea")
    }
})