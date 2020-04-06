({
	showModal: function(component, event, helper,partnerType) {
        var recordId = component.get('v.recordId'),
            modalBody;

        $A.createComponent('c:BecomeATwilioPartnerForm', {partnerType: partnerType},
            function(content, status) {
               // console.log(status);
                content.addEventHandler("closeModal", component.getReference("c.handleCloseModalEvent"));
                if (status === 'SUCCESS') {
                    modalBody = content;
                    var modalPromise = component.find('overlayLib').showCustomModal({
                        header: "Become A Partner",
                        body: modalBody,
                        cssClass: "mymodals",
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
    }
})