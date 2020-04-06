({
	doInit : function(component, event, helper) {
        debugger;
        var prefixCmp = component.find("cmPrefix");
        if(!$A.util.isUndefinedOrNull(prefixCmp)){
             
            prefixCmp.getURLPrefix(function(result) {
                component.set("v.prefixPath",result);
                
            });
            
        }
    }
})