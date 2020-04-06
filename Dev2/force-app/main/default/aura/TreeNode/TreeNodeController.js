({
    doInit : function(component, event, helper) {
        try{
        // Parse item
        var children = helper.parseItem(component);
        // Check if this is a node
        if (children.length > 0) {
            // Set default expand icon
            helper.changeIcon(component, "utility:chevrondown");
            // Check if we should collapse based on config and current level
            var config = component.get("v.config");
            var level = component.get("v.level");
            if (level >= config.expandLevel)
                helper.toggleNodeExpand(component);
            
        }
        }catch(e){
            console.log('error in treenode init'+e);
        }
    },
    
    onToggleExpand : function(component, event, helper) {
        helper.toggleNodeExpand(component);
        // Prevent accidental node selection
        event.stopPropagation();
    },
    
    onSelectChange : function(component, event, helper) {
        helper.selectChildNodes(component, event, helper);
    },
    selectItem:function(component, event, helper) {
        try{
            var params =event.getParam('arguments');
            component.set("v.selected",params.selected);
            helper.selectChildNodes(component, event, helper);
        }catch(e){
            console.log('error in selectItem'+e);
        }
    },
    handleTreeSelection:function(component, event, helper) {
        debugger;
        var selection = event.getParam("selection");
        var parent = event.getParam("parent");
        var selected = event.getParam("select");
        if(!$A.util.isUndefinedOrNull(parent)){
            if(parent == component.get('v.value') && !selected ){
                component.set("v.selected",false);
            }
        }
    },
    fetchSelectedRows:function(component, event, helper) {
        var checkedNodes = [];
        if (component.get("v.selected")) {
            checkedNodes.push(component.get("v.item"));
        }
        try{
            var cmps = component.find("childNode");
            if (!$A.util.isUndefinedOrNull(cmps)) {
                if (Array.isArray(cmps) && cmps.length > 0){
                    for (var i = 0; i < cmps.length; i++) {
                        var node = cmps[i];
                        var childCheckedNodes = node.getSelectedRows();
                        if(!$A.util.isUndefinedOrNull(childCheckedNodes)){
                            if (childCheckedNodes.length > 0){
                                checkedNodes = checkedNodes.concat(childCheckedNodes);
                            }
                        } 
                        
                        
                    } 
                }else {
                    var node = cmps;
                    var childCheckedNodes = node.getSelectedRows();
                    if(!$A.util.isUndefinedOrNull(childCheckedNodes)){
                        if (childCheckedNodes.length > 0){
                            checkedNodes = checkedNodes.concat(childCheckedNodes);
                        }
                    } 
                }
            }
            
        }catch(e){
            console.log('error in fetchSelectedRows'+e);
        }
        return checkedNodes;
        
    },
    clearAllNodes : function(component, event, helper) {
        component.set("v.selected",false);
        helper.selectChildNodes(component, event, helper);
    }
    
})