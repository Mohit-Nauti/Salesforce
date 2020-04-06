({
    doInit : function(component, event, helper) {
        var action = component.get('c.getEventDetails');
        action.setParams({
            RecordId: component.get("v.recordId")
        });
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                var values = response.getReturnValue();
                component.set('v.wrapperDetails',values);
            }
        });
        $A.enqueueAction(action);
    }
})