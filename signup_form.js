+function(a,p,P,b,y){a.braze={};a.brazeQueue=[];for(var s="BrazeSdkMetadata DeviceProperties Card Card.prototype.dismissCard Card.prototype.removeAllSubscriptions Card.prototype.removeSubscription Card.prototype.subscribeToClickedEvent Card.prototype.subscribeToDismissedEvent Card.fromContentCardsJson Banner CaptionedImage ClassicCard ControlCard ContentCards ContentCards.prototype.getUnviewedCardCount Feed Feed.prototype.getUnreadCardCount ControlMessage InAppMessage InAppMessage.SlideFrom InAppMessage.ClickAction InAppMessage.DismissType InAppMessage.OpenTarget InAppMessage.ImageStyle InAppMessage.Orientation InAppMessage.TextAlignment InAppMessage.CropType InAppMessage.prototype.closeMessage InAppMessage.prototype.removeAllSubscriptions InAppMessage.prototype.removeSubscription InAppMessage.prototype.subscribeToClickedEvent InAppMessage.prototype.subscribeToDismissedEvent InAppMessage.fromJson FullScreenMessage ModalMessage HtmlMessage SlideUpMessage User User.Genders User.NotificationSubscriptionTypes User.prototype.addAlias User.prototype.addToCustomAttributeArray User.prototype.addToSubscriptionGroup User.prototype.getUserId User.prototype.incrementCustomUserAttribute User.prototype.removeFromCustomAttributeArray User.prototype.removeFromSubscriptionGroup User.prototype.setCountry User.prototype.setCustomLocationAttribute User.prototype.setCustomUserAttribute User.prototype.setDateOfBirth User.prototype.setEmail User.prototype.setEmailNotificationSubscriptionType User.prototype.setFirstName User.prototype.setGender User.prototype.setHomeCity User.prototype.setLanguage User.prototype.setLastKnownLocation User.prototype.setLastName User.prototype.setPhoneNumber User.prototype.setPushNotificationSubscriptionType InAppMessageButton InAppMessageButton.prototype.removeAllSubscriptions InAppMessageButton.prototype.removeSubscription InAppMessageButton.prototype.subscribeToClickedEvent automaticallyShowInAppMessages destroyFeed hideContentCards showContentCards showFeed showInAppMessage toggleContentCards toggleFeed changeUser destroy getDeviceId initialize isPushBlocked isPushPermissionGranted isPushSupported logCardClick logCardDismissal logCardImpressions logContentCardImpressions logContentCardsDisplayed logCustomEvent logFeedDisplayed logInAppMessageButtonClick logInAppMessageClick logInAppMessageHtmlClick logInAppMessageImpression logPurchase openSession requestPushPermission removeAllSubscriptions removeSubscription requestContentCardsRefresh requestFeedRefresh requestImmediateDataFlush enableSDK isDisabled setLogger setSdkAuthenticationSignature addSdkMetadata disableSDK subscribeToContentCardsUpdates subscribeToFeedUpdates subscribeToInAppMessage subscribeToSdkAuthenticationFailures toggleLogging unregisterPush wipeData handleBrazeAction".split(" "),i=0;i<s.length;i++){for(var m=s[i],k=a.braze,l=m.split("."),j=0;j<l.length-1;j++)k=k[l[j]];k[l[j]]=(new Function("return function "+m.replace(/\./g,"_")+"(){window.brazeQueue.push(arguments); return true}"))()}window.braze.getCachedContentCards=function(){return new window.braze.ContentCards};window.braze.getCachedFeed=function(){return new window.braze.Feed};window.braze.getUser=function(){return new window.braze.User};(y=p.createElement(P)).type='text/javascript';
    y.src='https://js.appboycdn.com/web-sdk/4.3/braze.min.js';
    y.async=1;(b=p.getElementsByTagName(P)[0]).parentNode.insertBefore(y,b)
}(window,document,'script');

braze.initialize('8a7ba213-9ea9-44a6-9d6b-0a76855feae8', {
    baseUrl: 'sdk.iad-05.braze.com',
    "allowUserSuppliedJavascript": true,
    "enableLogging": true,
});

let formButton = document.querySelector("#signupButton")
formButton.addEventListener('click', subscribeClick)

function subscribeClick(event){
    event.preventDefault();
    subscribeNewsletters()
}

function subscribeNewsletters() {
    let subscribeList = Array()
    let newsletterNames = Array()
    const checkboxes = document.querySelectorAll(".checkboxSelector")
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
    const checkboxes = document.querySelectorAll(".checkboxSelector")
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