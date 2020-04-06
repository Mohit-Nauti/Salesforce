({
	doInit : function(component, event, helper) {
		var action = component.get("c.getCompanyProfileId");
            action.setCallback(this, (response) => {

                var state = response.getState();

                if (state === 'SUCCESS') {

                    var companyProfileId = response.getReturnValue();

                    component.set("v.recordId",companyProfileId);

                } else if (state === 'ERROR') {

                    var errors = response.getError();

                    reject(errors);

                }

            });

            $A.enqueueAction(action);
    }
	
})