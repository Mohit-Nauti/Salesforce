({
    getPicklistValuesBasednRecordType : function(component) {
        
        var objectAPIName = 'Case';
        var fieldAPIName = 'Whatdoyouneedhelpwith__c';
        var recordTypeDevId = component.get("v.itemsToDisplay");
        
        var action = component.get("c.getPicklistValueBasedonRecordType");
        
        action.setParams({
            objectAPIName : objectAPIName,
            fieldAPIName : fieldAPIName,
            recordTypeDevId : recordTypeDevId.recID
        });
        
        action.setCallback(this, function(response){
            this.handleResponse(response, component);
        });
        
        $A.enqueueAction(action);
        
	},
    
    handleResponse : function(response, component){
        if (response.getState() === "SUCCESS") {
            if (!$A.util.isEmpty(response.getReturnValue())) {
                var picklistOptions = [];
                var noneValue = {};
                noneValue["value"] = "";
                noneValue["label"] = "Tell Us More!";
                picklistOptions.push(noneValue);
                var returnedValues = JSON.parse(response.getReturnValue());
                if (!$A.util.isEmpty(returnedValues)) {
                    returnedValues.forEach(function(returnedValue){
                        var picklistValue = {};
                        picklistValue["value"] = returnedValue.value;
                        picklistValue["label"] = returnedValue.label;
                        picklistOptions.push(picklistValue);
                    });
                    component.set("v.pickListOptions", picklistOptions);
                    console.log("test1"+picklistOptions);
                }
            }else{
                console.log("Couldn't find an picklist values.");
            }
        } else if (response.getState() === "ERROR") {
            var errors = res.getError();
            if (errors) {
                if (errors[0] && errors[0].message) {
                    console.log(errors[0].message);
                }
            }
        } else{
            console.log("Unknow error!");
        }
    },
    
    PickChangeDepHelper : function(component, event, helper) {
        var parentValue = component.find('parentPicklist').get('v.value');
        var parentValueDep = component.find('thetellusMorepicklist').get('v.value');
        if(parentValue != '' && parentValueDep != ''){   
            component.set('v.disabledNextBtton',false);
        }
        else {
            component.set('v.disabledNextBtton',true);
        }
    },
    
    fetchAccName : function(component, event, helper) {
       var action = component.get("c.queryAccountName");
       var recId = component.get("v.recordId");
       var ObjNme = component.get("v.sObjectName");
       console.log(ObjNme,ObjNme)
       action.setParams({
           sobjectType : ObjNme,
           recordId : recId
       });
       action.setCallback(this, function(response){
          var state = response.getState();
           if(state === 'SUCCESS' ){
               var NameOfObj = response.getReturnValue();
               component.set("v.AccId", NameOfObj);
           }
       });
       $A.enqueueAction(action);
    },
})