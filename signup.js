

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
}

function confirmationWindow(newsletterNames){
    if (screen.width <= 728) {
        let left = (screen.width - 320) / 2;
        let fsize = 10;
    }
    else {
        let left = (screen.width - 600) / 2;
        let fsize = 12;
    }


}
