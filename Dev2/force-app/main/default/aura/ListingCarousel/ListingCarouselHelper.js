({
    setRecordTypeId :function (cmp) {
        var action = cmp.get("c.getRecordType");
        action.setParams({ type : "Carousel"});

        // Create a callback that is executed after 
        // the server-side action returns
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                // Alert the user with the value returned 
                // from the server
              //  console.log(response.getReturnValue());
                cmp.set("v.recordTypeId",response.getReturnValue());

                
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

        
        $A.enqueueAction(action);
    },
	fetchData: function (cmp, numberOfRecords) {
        var action = cmp.get("c.getAssets");
        action.setParams({ type : "Carousel",
                          partnerListingId :cmp.get("v.recordId")});

        // Create a callback that is executed after 
        // the server-side action returns
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                // Alert the user with the value returned 
                // from the server
               // console.log(response.getReturnValue());
                cmp.set("v.data",response.getReturnValue());

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
    removeAsset: function (cmp, helper,row) {
        
       var action = cmp.get("c.deleteAsset");
        action.setParams({ asset : row
                          });

        // Create a callback that is executed after 
        // the server-side action returns
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                // Alert the user with the value returned 
                // from the server
               // console.log(response.getReturnValue());
               // cmp.set("v.data",response.getReturnValue());
 helper.fetchData(cmp);
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
    
    showAttachment :function(){
         var rows = cmp.get('v.rawData');
    },
    getRowActions: function (cmp, row, doneCallback) {
        var actions = [{
            'label': 'Preview',
            'iconName': 'utility:preview',
            'name': 'preview'
        }];
        var deleteAction = {
            'label': 'Delete',
            'iconName': 'utility:delete',
            'name': 'delete'
        };

        

        actions.push(deleteAction);

        // simulate a trip to the server
        setTimeout($A.getCallback(function () {
            doneCallback(actions);
        }), 200);
    },
    showAttachment:function (cmp, helper,row) {
        
        var modalBody;
        $A.createComponent("c:PreviewImage", {assetId:row.Id},
           function(content, status) {
               if (status === "SUCCESS") {
                   modalBody = content;
                   cmp.find('overlayLib').showCustomModal({
                       header: "Preview",
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
    }
    
})