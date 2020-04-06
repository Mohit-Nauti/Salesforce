({
    getInit : function(component, event, helper) {
        var theRecordId= component.get("v.recordId");
        var action = component.get('c.getRelatedListRecord');
        action.setParams({
            RecordId : theRecordId
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set('v.WrapperList', response.getReturnValue());
                component.set('v.BaseURL', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    redirect  : function (component, event, helper) {
        var recordId = event.currentTarget.dataset.procinstId;
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": recordId,
            "slideDevName": "Detail"
        });
        navEvt.fire();
    }
})