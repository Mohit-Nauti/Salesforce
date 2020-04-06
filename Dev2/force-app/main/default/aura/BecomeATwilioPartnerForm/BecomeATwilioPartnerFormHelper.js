({
	getFormSettings : function(component,event) {
		var action = component.get("c.initializeFormSettings");
		action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
			  // console.log('SERVER RESPONSE..'+response.getReturnValue());
               component.set("v.leadFormsettings",JSON.parse(response.getReturnValue()));
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);

    },
    
    createLeadApex : function(component,event,leadRec) {
        
        var action = component.get("c.createLead");
		action.setParams({"leadRec" : leadRec});
		action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
			  // console.log('SERVER RESPONSE..'+response.getReturnValue());
			    var closeModalEvent = component.getEvent("closeModal");
        		closeModalEvent.fire();
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                        component.set("v.isSpinner",false);
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "title": 'Error',
                            "message": errors[0].message,
                            "type": "error",
                            "mode": "sticky"
                        });
                        toastEvent.fire();
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);

	},
    
    doInitrecaptcha: function (cmp, evt, helper){
        let vfOrigin = "https://build.twilio.com"; 
        window.addEventListener("message", function(event) {
            console.log(event.data);
            if (event.origin !== vfOrigin) {
                // Not the expected origin: Reject the message!
                return;
            } 
            if (event.data==="Unlock"){            	
              let myButton = cmp.find("myButton");
                myButton.set('v.disabled', false);
            }            
        }, false);                
    },
})