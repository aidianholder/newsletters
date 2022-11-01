

braze.initialize('8a7ba213-9ea9-44a6-9d6b-0a76855feae8', {
    baseUrl: 'sdk.iad-05.braze.com',
    "allowUserSuppliedJavascript": true,
    "enableLogging": true,
});

const formButton = document.querySelector("#signupButton")
formButton.addEventListener('click', subscribeClick)

function subscribeClick(event){
    event.preventDefault();
    subscribeNewsletters()
}

function subscribeNewsletters() {
    let subscribeList = Array()
    let newsletterNames = Array()
    const checkboxes = document.querySelectorAll(".sc-gqjmRU")
    for (const checkbox of checkboxes) {
        if (checkbox.checked) {
            subscribeList.push(checkbox.value)
            newsletterNames.push(checkbox.name)
        }
    }
    if (subscribeList.length > 0) {
        for (const newsletterID in subscribeList) {
            braze.getUser().addToSubscriptionGroup(newsletterID)
        }
        braze.getUser().setEmailNotificationSubscriptionType("opted_in")
    }

    confirmationWindow(newsletterNames)

}

function hideModal(){
    const modalBody = document.querySelector("#modal1")
    modalBody.classList.remove("is-visible");
    let ul = document.querySelector("#subscribedSuccessList")
    while (ul.firstChild){
        ul.removeChild(ul.firstChild)
    }
    const checkboxes = document.querySelectorAll(".sc-gqjmRU")
    for (const checkbox of checkboxes) {
        checkbox.checked = false
    }
}


function confirmationWindow(newslettersSuccess){
    const ulBase = document.querySelector("#subscribedSuccessList")
    for (nl in newslettersSuccess){
        let newLI = document.createElement("li");
        newLI.appendChild(document.createTextNode(newslettersSuccess[nl]));
        ulBase.appendChild(newLI)
    }
    const modalBody = document.querySelector("#modal1")
    modalBody.classList.add("is-visible")
    const modalClose = document.querySelector(".close-modal")
    modalClose.addEventListener('click', hideModal)
    modalBody.addEventListener('click', hideModal)
}