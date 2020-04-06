({
    scriptsLoaded : function(component, event, helper) {
        helper.getResponse(component, true);
    },
    
    enroll : function(component, event, helper) {
        console.log('inside enroll-');
        console.log('enrolled--->'+component.get("v.eventObject").enrolled);
        if(component.get("v.eventObject").isClassFull == false) {
            console.log('*********************8');
            var action = component.get("c.enrollContact");
            action.setParams({eventId:component.get("v.eventId"),eventDetail:component.get("v.eventDetail")});
            action.setCallback(this, function(response) {
                var state = response.getState();
                console.log('state--->'+state);
                if (state === "SUCCESS") {
                    console.log('inside enroll 1');
                    
                    var result = response.getReturnValue();
                    if(component.get("v.eventObject").eventtype == "Class") {
                        console.log('inside enroll2');
                        component.set("v.meetingTitle","Your Request Has Been Made");
                        component.set("v.showOkButton",false);
                        component.set("v.showMeetingDetail",true);
                        component.set("v.showRegistrationDetail",false);
                        component.set("v.showModal",true);
                    }
                    helper.getResponse(component, false);
                } else {
                    //alert(' '+state);
                }
            });
            
            if(component.get("v.eventObject").enrolled == false) {
                $A.enqueueAction(action);
            }
        } else {
            component.set("v.meetingTitle","This "+component.get("v.eventObject").eventtype+" is already full.");
            component.set("v.showOkButton",false);
            component.set("v.showModal",true);
        }
    },
    
    cancelEnroll : function(component, event, helper) {
        var action = component.get("c.cancelEnrollment");
        action.setParams({eventId:component.get("v.eventId")});
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                console.log("Data: \n" + result);
                if(result == true) {
                    component.set("v.meetingTitle","Your Enrollment has been cancelled");
                    component.set("v.showOkButton",false);
                    component.set("v.showModal",true);
                    helper.getResponse(component, false);
                }  
            } else if (state === "INCOMPLETE") {
            } else if (state === "ERROR") {
                
            }
        });
        $A.enqueueAction(action);
    }
});