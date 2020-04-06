({
    afterScriptsLoaded : function(component, event, helper) {
        helper.getProductList(component);
        var forRefresh = component.get("v.isboolean");
        if(forRefresh == false)
            location.reload();
    },
    checkboxSelect: function(component, event, helper) {
        console.log(event.getParam('value'));
        var items = component.get("v.selectedItems");
        if(items.includes('Total')) {
            var items = [];
            for(var idx = 0; idx < component.get("v.legends").length; idx++) {
                items.push(component.get("v.legends")[idx].label);
            }
            component.set("v.selectedItems", items);
        }
        helper.getResponse(component);
    }
})