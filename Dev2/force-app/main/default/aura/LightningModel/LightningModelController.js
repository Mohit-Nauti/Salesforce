({
	cancel : function(component, event, helper) {
		component.set("v.isOpen",false);
	},
    
    yesButton : function(component, event, helper) {
        var componentEvent = component.get("v.yesButton");
        $A.enqueueAction(componentEvent);
        component.set("v.isOpen",false);
    },

    cancelEnrollButton : function(component, event, helper) {
        var componentEvent = component.get("v.cancelEnrollButton");
        $A.enqueueAction(componentEvent);
        component.set("v.isOpen",false);
    }
})