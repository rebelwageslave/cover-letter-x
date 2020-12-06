

chrome.storage.sync.get("templates", function(value) {
    const templates = value.templates
    const list = document.getElementById("template_list")
    for ( let template of templates  ) {
        const li = document.createElement("li")
        li.innerText = template
        list.appendChild(li)
    }


})



window.addEventListener("load", function() {
    let button  = document.getElementById("cv_submit_button")
    if ( button ) {
            button.addEventListener("click", function() {
                // get the template and save.
                let template = document.getElementById("cv_letter_template_input")
                if (  ! template ) {
                    return;
                }
                const templateString = template.value
                // get templates and add the value
                chrome.storage.sync.get("templates", function(value) {
                    let templates = value.templates
                    if ( ! Array.isArray(templates ) ) {
                        templates  = []
                    }
                    templates.push(templateString)
                    chrome.storage.sync.set({"templates": templates})
                    alert("saved")
                })

            })
    }
})

