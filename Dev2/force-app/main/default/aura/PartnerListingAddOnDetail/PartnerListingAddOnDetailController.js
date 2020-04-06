({
	onInit : function(component, event, helper) {
		var partnerListingData = component.find("listingDataservice");
		// call the aura:method in the child component
		var recordId = component.get("v.recordId");
        partnerListingData.fetchListingDetail(recordId,function(result) {
			console.log("callback for aura:method was executed");
			//console.log("RecordID"+recordId);
			//console.log("result: " + result);
			component.set("v.listingDetail",result);
        });
	},

    installURL : function(component, event, helper) {
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
         "url": 'https://www.twilio.com/console/add-ons/' + component.get("v.listingDetail.partnerListing.Available_Add_On_SID__c")
        });
        urlEvent.fire();
    },

    navigate : function(component, event, helper) {
        
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
          "url": 'https://' + component.get("v.listingDetail.partnerListing.Partner_Profile__r.Website__c")
        });
        urlEvent.fire();
    }
})