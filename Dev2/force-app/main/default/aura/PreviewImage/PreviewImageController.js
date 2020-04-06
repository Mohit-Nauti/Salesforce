({
	init : function(cmp, event, helper) {
        var prefixCmp = cmp.find("cmPrefix");
        if(!$A.util.isUndefinedOrNull(prefixCmp)){
             
            prefixCmp.getURLPrefix(function(result) {
                cmp.set("v.prefixURL",'/'+result+'/sfc/servlet.shepherd/version/download/');
                
            });
            
        }
        
		var action = cmp.get("c.getContent");
        action.setParams({ assetId : cmp.get("v.assetId")});

        // Create a callback that is executed after 
        // the server-side action returns
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                // Alert the user with the value returned 
                // from the server
               // console.log('response.getReturnValue-->'+response.getReturnValue());
                cmp.set("v.content", response.getReturnValue()); 

                // You would typically fire a event here to trigger 
                // client-side notification that the server-side 
                // action is complete
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

        // optionally set storable, abortable, background flag here

        // A client-side action could cause multiple events, 
        // which could trigger other events and 
        // other server-side action calls.
        // $A.enqueueAction adds the server-side action to the queue.
        $A.enqueueAction(action);
	},
    handleClose: function(component, event, helper) {
    var closeModalEvent = $A.get("e.c:CarouselModalClose");

             closeModalEvent.fire();
    }
})