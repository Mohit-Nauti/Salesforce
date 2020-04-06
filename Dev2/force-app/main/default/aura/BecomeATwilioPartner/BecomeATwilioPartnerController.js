({
    techPartnerClick : function(component, event, helper) {
        helper.showModal(component, event, helper,'Technology');
    },

    consultPartnerClick : function(component, event, helper) {
        helper.showModal(component, event, helper,'Consulting');
    },

    handleCloseModalEvent : function(component, event, helper) {

        var overlayPanel = component.get('v.overlayPanel');
        overlayPanel[0].close();
        var modalBody;

        $A.createComponent('c:LeadConfirmationModal', {},
            function(content, status) {
               
                content.addEventHandler("closeLeadModal", component.getReference("c.handleCloseLeadModalEvent"));
                if (status === 'SUCCESS') {
                    modalBody = content;
                    var modalPromise = component.find('confirmationModal').showCustomModal({
                        header: "Become A Partner",
                        body: modalBody,
                        showCloseButton: true,
                        closeCallback: function() {
                            //console.log('Closed Event');
                        }
                    }).then(function(overlay){
                        //overlay.close();
                        component.set('v.leadPanel', overlay);
                    })
                    //component.set("v.modalPromise", modalPromise);
                }
            }
        )
    },

    handleCloseLeadModalEvent : function(component, event, helper) {
        var confirmPanel = component.get('v.leadPanel');
        confirmPanel[0].close();
    }

})