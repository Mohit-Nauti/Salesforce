({
    doInit : function(component, event, helper) {
        //alert(" Partner Action"+component.get("v.recordId"));
        var action = component.get("c.getOpportunityPartners");
        action.setParams({"recordId" : component.get("v.recordId")});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                component.set("v.pdsrData",result);
                //alert(" "+JSON.stringify(result,null,2));
            } else if (state === "INCOMPLETE") {
            } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    }
})