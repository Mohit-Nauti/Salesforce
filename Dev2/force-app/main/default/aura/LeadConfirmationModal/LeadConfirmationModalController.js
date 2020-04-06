({
	handleCancel : function(component, event, helper) {
		var closeModalEvent = component.getEvent("closeLeadModal");
        closeModalEvent.fire();
	}
})