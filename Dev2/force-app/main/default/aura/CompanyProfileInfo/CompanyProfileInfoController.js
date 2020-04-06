({
    handleCompanyProfileId: function(component, event, helper) {
        var recordId = event.getParam("recordId");
        //console.log('CompanyProfileRecordId', recordId);
        component.set("v.CompanyProfileRecordId", recordId);
        var containerDiv = component.find('container');
        $A.util.removeClass(containerDiv, 'slds-hide');
    }
})