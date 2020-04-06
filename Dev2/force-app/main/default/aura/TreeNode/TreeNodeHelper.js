({    
    parseItem : function(component) {
        try{
            var config = component.get("v.config");
            var item = component.get("v.item");
            
            var label;
            var children = [];
            var value;
            
            if (typeof item === 'string'){
                label = item;
                value=item;
            }else if (Array.isArray(item) && item.length > 0) {
                label = this.getLabelFromArray(item);
                children = item;
            }
                else if (typeof item === 'object') {
                    label = this.getLabelFromObject(item, config.labelProperties);
                    children = this.getChildrenFromObject(item, config.expandProperties);
                    value = this.getValueFromObject(item, config.valueProperties);
                }
                    else
                        throw "Unknown node type: "+ typeof item;
            
            component.set("v.label", label);
            component.set("v.value", value);
            component.set("v.children", children);
            var selectedValues =  component.get("v.selectedValues");
            if(selectedValues != null){
                var isSelected ;
                if(Array.isArray(selectedValues) && selectedValues.length > 0){
                     isSelected = selectedValues.includes(value);
                } else {
                    
                   isSelected = (selectedValues==value);
                }
                 component.set("v.selected", isSelected);
                
            }    
            
            return children;
        }catch(e){
            console.log('something wrong'+e);
        }
    },
    
    getLabelFromArray : function(item) {
        if (item.length == 1)
            return "List of one item";
        return "List of "+ item.length +" items";
    },
    
    getLabelFromObject : function(item, labelProperties) {
        var label = null;
        for (var i=0; label == null && i<labelProperties.length; i++) {
            var value = item[labelProperties[i]];
            if (value !== undefined && typeof value === 'string')
                label = value;
        }
        return (label == null) ? 'Undefined label' : label;
    },
    
    getValueFromObject : function(item, valueProperties) {
        var label = null;
        for (var i=0; label == null && i<valueProperties.length; i++) {
            var value = item[valueProperties[i]];
            if (value !== undefined && typeof value === 'string')
                label = value;
        }
        return (label == null) ? 'Undefined label' : label;
    },    
    getChildrenFromObject : function(item, expandProperties) {
        var children = null;
        for (var i=0; children == null && i<expandProperties.length; i++) {
            var value = item[expandProperties[i]];
            if (value !== undefined)
                children = value;
        }
        return (children == null) ? [] : children;
    },
    
    toggleNodeExpand : function(component) {
        var toggleExpandIcon = component.get("v.toggleExpandIcon");
        var subTree = component.find('subTree');
        if (toggleExpandIcon == "utility:chevrondown") {
            $A.util.addClass(subTree, 'collapsed');
            this.changeIcon(component, "utility:chevronright");
        }
        else {
            $A.util.removeClass(subTree, 'collapsed');
            this.changeIcon(component, "utility:chevrondown");
        }
    },
    
    changeIcon : function(component, svgIcon) {
        component.set("v.toggleExpandIcon", svgIcon);
    },
    selectChildNodes:function(component, event, helper){
         
        try{
            var isSelected = component.get("v.selected");
            var cmps = component.find("childNode");
            if(!$A.util.isUndefinedOrNull(cmps)){
                if (Array.isArray(cmps) && cmps.length > 0) {
                    cmps.forEach(function(cmp) {
                        cmp.setSelected(isSelected);
                    });
                }else {
                    cmps.setSelected(isSelected);
                }
                
                
            }
            // Select element
            var selectionEvent = component.getEvent("treeSelectionEvent");
            selectionEvent.setParams({"selection": component.get('v.item'),
                                      "parent": component.get('v.parent'),
                                      "select":isSelected});
            
            selectionEvent.fire();
        }catch(e){
            console.log('error in onSelectChange'+e);
        }
    }
    
})