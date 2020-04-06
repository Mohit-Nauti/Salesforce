({
    init: function(component, event, helper) {
        helper.getId(component, event, helper).then(companyProfileId => {
            //console.log(companyProfileId);
            var createAcountContactEvent = $A.get("e.force:createRecord");
            createAcountContactEvent.setParams({
                "entityApiName": "Partner_Listing__c",
                "defaultFieldValues": {
                    'Partner_Profile__c': companyProfileId
                }
            });
            //createAcountContactEvent.fire();
        });
    }
})