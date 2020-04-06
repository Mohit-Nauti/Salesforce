({
    getId: function(component, event, helper) {
        return new Promise($A.getCallback((resolve, reject) => {
            var action = component.get("c.getCompanyProfileId");
            action.setCallback(this, (response) => {

                var state = response.getState();

                if (state === 'SUCCESS') {

                    var companyProfileId = response.getReturnValue();

                    resolve(companyProfileId);

                } else if (state === 'ERROR') {

                    var errors = response.getError();

                    reject(errors);

                }

            });

            $A.enqueueAction(action);

        }));
    },
    showToast: function(params) {
        return new Promise($A.getCallback((resolve, reject) => {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams(params);
            toastEvent.fire();
            resolve();
        }));
    }
})