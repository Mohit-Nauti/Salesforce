({
    init: function (cmp, event, helper) {
        helper.setRecordTypeId(cmp);
        var rowActions = helper.getRowActions.bind(this, cmp);
        cmp.set('v.columns', [
            { label: 'Name', fieldName: 'Name', type: 'text'},
            { label: 'Caption', fieldName: 'Caption__c', type: 'text'},
            { label: 'Display Order', fieldName: 'Display_Order__c', type: 'number'},
            { type: 'action', typeAttributes: { rowActions: rowActions } }
            
            
            
        ]);
        
        
        helper.fetchData(cmp);
    },
    
    handleRowAction: function (cmp, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');
        
        switch (action.name) {
            case 'preview':
                helper.showAttachment(cmp, helper,row);
                break;
            case 'delete':
                helper.removeAsset(cmp,helper, row);
                break;
        }
    },
    createCarouselModal: function (cmp, event, helper) {
        
        var modalBody;
        $A.createComponent("c:CreateCarousel", {listingrecordId:cmp.get("v.recordId"),
                                                recordTypeId: cmp.get("v.recordTypeId")},
           function(content, status) {
               if (status === "SUCCESS") {
                   modalBody = content;
                   cmp.find('overlayLib').showCustomModal({
                       header: "Add Carousel Details",
                       body: modalBody, 
                       showCloseButton: true,
                       cssClass: "mymodal",
                       closeCallback: function() {
                           
                       }
                   }).then(function(overlay){
                        //console.log(overlay);
                        cmp.set('v.overlayPanel', overlay);
                        //overlay.close();
                    })
               } else {
                   console.log('failed to create comp');
               }                              
           });
    },
    handleCloseModalEvent:function (cmp, event,helper) {
       // console.log('handleCloseModalEvent');
        var overlayPanel = cmp.get('v.overlayPanel');
        //  console.log('overlayPanel-->'+overlayPanel);
            overlayPanel.close();
        helper.fetchData(cmp);
    }
    
    
})