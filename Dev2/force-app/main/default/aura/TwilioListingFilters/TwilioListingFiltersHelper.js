({
	getFilterOptions : function(cmp) {
        var action = cmp.get("c.retrieveFilterOptions");
		action.setParams({ recordType : cmp.get("v.tabName") });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var res = response.getReturnValue();                
                cmp.set('v.filters',res);
                
            } else {
                console.log('error');
            }
        });
        $A.enqueueAction(action);
	}
})