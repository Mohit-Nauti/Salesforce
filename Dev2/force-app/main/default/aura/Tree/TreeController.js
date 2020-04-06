({
    doInit : function(component, event, helper) {
        try{
            // Validate config & set default values
            var config = component.get("v.config");
            if ($A.util.isUndefinedOrNull(config.labelProperties))
                config.labelProperties = ['Name'];
            if ($A.util.isUndefinedOrNull(config.expandProperties))
                config.expandProperties = [];
            if ($A.util.isUndefinedOrNull(config.expandLevel))
                config.expandLevel = 1;
            if ($A.util.isUndefinedOrNull(config.isSelectable))
                config.isSelectable = false;
            if ($A.util.isUndefinedOrNull(config.isNodeSelectionEnabled))
                config.isNodeSelectionEnabled = false;
            component.set("v.config", config);
        }catch(e){
            console.log('Tre init'+e);
        }
    },
    fetchSelectedRows:function(component, event, helper) {
        debugger;
        try{
            var cmps = component.find("childCmp");
            if (!$A.util.isUndefinedOrNull(cmps)) {
                return helper.getCheckedNodes(cmps,helper);
            }
            
        }catch(e){
            console.log('error in fetchSelectedRows'+e);
        }
        return null;
        
    },
    clearAll:function(component, event, helper) {
        debugger;
        try{
            var cmps = component.find("childCmp");
            if (!$A.util.isUndefinedOrNull(cmps)) {
                return helper.clearNodes(cmps,helper);
            }
        }catch(e){
            console.log('error in clearAll'+e);
        }
    }
})