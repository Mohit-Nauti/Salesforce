({
	gotoURL : function (component) {
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
          "url": "https://build.twilio.com"
        });
        urlEvent.fire();
    }
})