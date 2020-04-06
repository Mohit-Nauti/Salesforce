({
    doInit : function(component) {
        var action = component.get("c.setConAccId");
        action.setParams({thetaskId: component.get("v.recordId")});
        
        action.setCallback(this, function(response) {
            //store state of response
            var state = response.getState();
            if (state === "SUCCESS") {
                //set response value in wrapperList attribute on component.
                //component.set('v.wrapperList', response.getReturnValue());
                var theWrapRec =  JSON.parse(JSON.stringify(response.getReturnValue()));
                console.log('theWrapRec***'+theWrapRec);
                console.log('theWrapRec.getContact***'+theWrapRec.getContact);
                var createRecordEvent = $A.get('e.force:createRecord');
                
                if (createRecordEvent) {
                    createRecordEvent.setParams({
                        "entityApiName": "Opportunity",
                        "recordTypeId": theWrapRec.getRecordId,
                        "defaultFieldValues": {
                            'Create_Contact_Role__c' : true,
                            'Partner_Contact__c' : theWrapRec.getContact,
                            'AccountId' : theWrapRec.getAccount
                        }
                    });
                    createRecordEvent.fire();
                }
            }
        });
        $A.enqueueAction(action);
    }
})