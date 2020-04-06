({
	onInit : function(component, event, helper) {
        console.log('in consultant page');
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

	handleShowModal: function(component, event, helper) {
        var recordId = component.get('v.recordId'),
            modalBody;

        $A.createComponent('c:TwilioListingContentContainer', {listingrecordId: recordId},
            function(content, status) {
                console.log(status);
                content.addEventHandler("closeModal", component.getReference("c.handleCloseModalEvent")); 
                if (status === 'SUCCESS') {
                    modalBody = content;
                    var modalPromise = component.find('overlayLib').showCustomModal({
                        header: "Contact Partner",
                        body: modalBody,
                        showCloseButton: true,
                        closeCallback: function() {
                            //console.log('Closed Event');
                        }
                    }).then(function(overlay){
                        //console.log(overlay);
                        component.set('v.overlayPanel', overlay);
                        //overlay.close();
                    })
                    //component.set("v.modalPromise", modalPromise);
                }
            }
        )
    },

    handleCloseModalEvent : function(component, event, helper) {
        //console.log('close the modal');
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Thanks for reaching out!",
            "message": "This partner will reach out to you shortly. In the meantime, please browse our other consulting partners, apps, and add-ons!",
             "type": "Success",
             "mode": "sticky"
        });
        toastEvent.fire();
            var overlayPanel = component.get('v.overlayPanel');
            overlayPanel[0].close();
        },

        navigate : function(component, event, helper) {
        
            var urlEvent = $A.get("e.force:navigateToURL");
            urlEvent.setParams({
              "url": 'https://' + component.get("v.listingDetail.partnerListing.Partner_Profile__r.Website__c")
            });
            urlEvent.fire();
        }
})