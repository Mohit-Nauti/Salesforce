({
    doInit: function (cmp, event, helper) {
        try{
        cmp.set('v.gridColumns', [
            {label: 'Filters', fieldName: 'label', type: 'text'}
        ]);
        helper.getFilterOptions(cmp);
        }catch(e){
            console.log(e);
        }
    },
    
    handleRowSelected: function (cmp, event, helper) {
       var isMob= cmp.get('v.isMobile');
        if(!isMob){
            helper.applyFilter(cmp, event, helper);
        }
    },
    handleSubmit: function (cmp, event, helper) {
            helper.applyFilter(cmp, event, helper);
    },
    handleCancel:function(cmp, event, helper){
             cmp.find("filterOverlayLib1").notifyClose();
    },
    handleTreeSelection : function(component, event, helper) {
        var selection = event.getParam("selection");
        
    }
    
})