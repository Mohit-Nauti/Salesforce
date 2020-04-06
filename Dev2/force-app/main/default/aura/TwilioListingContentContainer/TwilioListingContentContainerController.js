({
	handleSubmit : function(component, event, helper) {
        console.log('handle submit');
        event.preventDefault();       // stop the form from submitting
        //console.log('Load Event' + JSON.stringify(event.getParams()));
        var fields = event.getParam('fields');
        fields.Partner_Listing__c = component.get("v.listingrecordId");
        component.find('form').submit(fields);
        //console.log(fields);
    },

    handleOnload : function(component, event, helper) {
       
    },

    handleSuccess : function(component, event, helper) {
        var closeModalEvent = component.getEvent("closeModal");
        closeModalEvent.fire();
    }
})