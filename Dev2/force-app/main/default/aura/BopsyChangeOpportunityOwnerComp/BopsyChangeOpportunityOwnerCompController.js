({
    findUserAction : function(component, event, helper) {
        console.log(" Partner Action "+component.get("v.searchString"));
        var action = component.get("c.findUser");
        action.setParams({searchString : component.get("v.searchString")});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                component.set("v.userList",result);
                console.log(" "+JSON.stringify(result,null,2));
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
    },

    assignUser : function(component, event, helper) {
        console.log(" assignUser "+component.get("v.userId"));
        helper.hideMessages(component);
        var action = component.get("c.assign");
        action.setParams({userId : component.get("v.userId"), opportunityId : component.get("v.recordId")});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                component.set("v.userList",result);
                console.log(" Result "+JSON.stringify(result,null,2));

                if (result) {
                    if(result.indexOf('transfer') == -1 && result != 'success') {
                        console.log("Error message: " + result);

                        var resultsToast = $A.get("e.force:showToast");
                        resultsToast.setParams({
                            "mode": "sticky",
                            "type": "error",
                            "title": "Error occurred!",
                            "message": result
                        });
                        resultsToast.fire();

                        var dismissActionPanel = $A.get("e.force:closeQuickAction");
                        dismissActionPanel.fire();
                    } else {
                        component.set("v.searchString",'');
                        component.set("v.userList",[]);

                        var resultsToast = $A.get("e.force:showToast");
                        resultsToast.setParams({
                            "mode": "sticky",
                            "type": "success",
                            "title": "Change has been recorded successfully.",
                            "message": "Please check back later to see the changed owner.\nMeanwhile, please make sure this Opportunity record do not have any validation error or required field missing."
                        });
                        resultsToast.fire();

                        var dismissActionPanel = $A.get("e.force:closeQuickAction");
                        dismissActionPanel.fire();
                    }
                }
            } else if (state === "INCOMPLETE") {
            } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        if(errors[0].message.indexOf('transfer') == -1) {
                            console.log("Error message: " + errors[0].message);
                            component.set("v.showError",true);
                            component.set("v.errorMessage",errors[0].message);
                        }
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    },

    setUser : function(component, event, helper) {
        console.log(" setUser "+component.get("v.userId"));

        if(component.get("v.userId") != "") {
            component.set('v.buttonState', false);
        } else {
            component.set('v.buttonState', true);
        }
    },

    checkUserProfile : function(component, event, helper) {
        console.log(" checkUserProfile "+component.get("v.userId"));

        var action = component.get("c.getProfileInfo");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                component.set("v.showComponent",result);
                console.log(" Show Component "+JSON.stringify(result,null,2));
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