({
	getURLPrefix : function(component, event, helper) {
       
        var params = event.getParam('arguments');
        //console.log(params);
        //console.log(params.partnerlistingId);
        var callback;
        if (params) {
            callback = params.callback;
            
        }
       
		var action = component.get("c.getBaseUrl");
        
      action.setCallback(this, function (response) {
         
        var state = response.getState();
         
        if (state === 'SUCCESS') {
           
           if (callback) callback(response.getReturnValue());
        } else {
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
      })
      $A.enqueueAction(action)
	}
})