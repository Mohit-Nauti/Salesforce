({
    doInit: function( component, event, helper ) {
        
        $A.get("e.force:closeQuickAction").fire();
        var action = component.get("c.getMQLobject");
        action.setParams({"MqlId":component.get('v.recordId')});
        
        // Configure response handler
        
        action.setCallback(this, function(response) {  
            $A.get("e.force:closeQuickAction").fire();
            var state = response.getState(); 
            console.log( state );
            if(state === "SUCCESS") {     
                console.log( response.getReturnValue() );
                var returnVal = response.getReturnValue();
                if($A.util.isEmpty(returnVal)){
                    $A.get("e.force:closeQuickAction").fire();
                    return;
                }
                var createRecordEvent = $A.get("e.force:createRecord");
                createRecordEvent.setParams({
                    "entityApiName": "Use_Case_Interest__c",
                    "defaultFieldValues": {
                        'Contact__c' : returnVal.Contact,
                        'MQL__c' : returnVal.MqlId,
                        'Account__c': returnVal.Account,
                        'Lead__c' : returnVal.Lead,
                    },
                    "recordTypeId":returnVal.RecordTypeId
                });
                createRecordEvent.fire();
                $A.get("e.force:closeQuickAction").fire();
            } else if (state == "ERROR"){
                
            } 
            
        });
        $A.enqueueAction(action);           
        
    },
    
})