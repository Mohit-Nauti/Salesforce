({
    onInit : function(component, event, helper) {
        
        helper.doInitrecaptcha(component, event);
        helper.getFormSettings(component, event);
    },
    
    handleSubmit : function(component, event, helper) {
      
        var allValid = component.find('field').reduce(function (validSoFar, inputCmp) {
                inputCmp.showHelpMessageIfInvalid();
                return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        if (allValid) {
            component.set("v.isSpinner",true);
            var leadRec = new Object();
            var settings = component.get("v.leadFormsettings");
            leadRec.OwnerId = settings.queueId;
            leadRec.Status = 'New Partner Request';
            leadRec.RecordTypeId = settings.recordTypeId;
            leadRec.Partner_Type__c = component.get("v.partnerType");
            leadRec.DB_State__c = component.get("v.state");
            leadRec.DBCountry__c = component.get("v.country");
            leadRec.FirstName = component.get("v.firstName");
            leadRec.LastName = component.get("v.lastName");
            leadRec.Email = component.get("v.email");
            leadRec.Phone = component.get("v.phone");
            leadRec.Company= component.get("v.company");
            leadRec.City= component.get("v.city");
            leadRec.PostalCode = component.get("v.zipCode");
            leadRec.Title = component.get("v.title");
            leadRec.Lead_Source_URL_ELOQUA__c = 'https://doer.force.com/partner/s/';
            var doNotSync = component.get("v.doNotSyncWithEloqua");
           
            leadRec.Do_Not_Sync_with_Eloqua__c= doNotSync;
            //console.log(JSON.stringify(leadRec));
            helper.createLeadApex(component, event,JSON.stringify(leadRec));
        } else {
            component.set("v.isSpinner",false);
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": 'Error',
                "message": 'Please update the invalid form entries and try again.',
                "type": "error",
                "mode": "sticky"
            });
            toastEvent.fire();
        }
    },
    
    
       
})