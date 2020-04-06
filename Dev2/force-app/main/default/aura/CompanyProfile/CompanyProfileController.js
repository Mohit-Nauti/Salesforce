({
    doInit: function(component, event, helper) {

        //console.log('entered Init');

        var companyProfileIdEvent = $A.get("e.c:CompanyProfileId");
        //console.log('companyProfileIdEvent', companyProfileIdEvent);

        helper.getId(component, event, helper).then(companyProfileId => {
            component.set('v.recordId', companyProfileId);
            companyProfileIdEvent.setParams({ "recordId": companyProfileId });
            companyProfileIdEvent.fire();

        }).catch(err => {
            console.error('error', err);
            helper.showToast({ "message": err.message, "type": "error" });
        });
    }
})