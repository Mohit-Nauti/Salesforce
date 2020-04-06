({
    doInit : function(component, event, helper) {
        var fetchTypeOfHelpAction = component.get("c.fetchTypeOfHelp");
        fetchTypeOfHelpAction.setParams({
        }); 
        fetchTypeOfHelpAction.setCallback(this, function(a) {
            var result = a.getReturnValue();
            component.set("v.parentOptions", result);
            
        });
        
        $A.enqueueAction(fetchTypeOfHelpAction);
        helper.fetchAccName(component);
    },
    
    createCase: function (component) {
        console.log('test7'+component.get("v.itemsToDisplay"))
        var recordTypeIdValue = component.get("v.itemsToDisplay");
        var tellusMoreValue = component.find('thetellusMorepicklist').get('v.value');
        var accId = component.get("v.AccId");
        var ObjNme = component.get("v.sObjectName");
        var oppId;
        var riskReportId;
        var agreementId;
        var launchPlanId;
        var recId = component.get("v.recordId");
        console.log(ObjNme);
        if(ObjNme == 'Opportunity') {
            oppId = component.get("v.recordId");
        }
        if(ObjNme == 'Risk_Report__c'){
            riskReportId = component.get("v.recordId");
        }
        if(ObjNme == 'Launch_Plan__c'){
            launchPlanId = component.get("v.recordId");
        }
        if(ObjNme == 'Apttus__APTS_Agreement__c'){
            agreementId = component.get("v.recordId");
        }
        console.log("accId",accId);
        console.log('tellusMoreValue',tellusMoreValue)
        var createRecordEvent = $A.get('e.force:createRecord');
        if ( createRecordEvent ) {
            createRecordEvent.setParams({
                'entityApiName': 'Case',
                'recordTypeId' : recordTypeIdValue.recID,
                "defaultFieldValues": {
                    'Whatdoyouneedhelpwith__c' : tellusMoreValue,
                    'AccountId' : accId,
                    'Opportunity__c' : oppId,
                    'Risk_Report_Lookup__c' : riskReportId,
                    'Agreement__c' : agreementId,
                    'Launch_Plan_Lookup__c' : launchPlanId,
                    'Related_To_ID__c' : recId
                }
                
            });
            createRecordEvent.fire();
        } else {
            alert("Case creation not supported");
        }
    },
    
    PickChange : function(component, event, helper) {
        var parentValue = component.find('parentPicklist').get('v.value');
        console.log('parentValue',parentValue)
        if(parentValue == '') {
            component.set('v.disabledPick',true);
        }
        else {
            component.set('v.disabledPick',false);
            var action = component.get("c.fetchRecordTypeOfHelp");
            action.setParams({
                'selectedTypeofHelp' :  parentValue
            }); 
            action.setCallback(this, function(result) {
                var state = result.getState();
                if (component.isValid() && state === "SUCCESS"){
                    
                    component.set("v.itemsToDisplay",result.getReturnValue());
                    helper.getPicklistValuesBasednRecordType(component);
                    component.set('v.disabledPick',false);
                    
                }
                
            });
            $A.enqueueAction(action);
        }
        helper.PickChangeDepHelper(component);
    },
    
    PickChangeDep : function(component, event, helper) {
        helper.PickChangeDepHelper(component);
    },
    
    
})