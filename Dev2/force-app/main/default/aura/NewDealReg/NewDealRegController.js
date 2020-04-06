({
    doInit : function(component, event, helper) {
        helper.doInitHelper(component, event, helper);
    },
    
    saveForm : function(component, event, helper) {
        //component.find('emailAdd').showHelpMessageIfInvalid();
        //component.find('custName').showHelpMessageIfInvalid();
        //component.find('chszCode').showHelpMessageIfInvalid();
        //component.find('cnofEmp').showHelpMessageIfInvalid();
        //component.find('coDescription').showHelpMessageIfInvalid();


        //component.find('ccpNumber').showHelpMessageIfInvalid();
        //component.find('lName').showHelpMessageIfInvalid();
        var selectedValues = component.get("v.selectedGenreList");       
        if(selectedValues == 'Other'){
        	component.find('otherTextbox').showHelpMessageIfInvalid();
        }
        helper.saveHelper(component, event, helper);
        
        
    },
    
    handleGenreChange: function (component, event, helper) {
        var selectedValues = event.getParam("value");
        component.set("v.selectedGenreList", selectedValues);   
        console.log('selectedValues'+selectedValues);
        if(selectedValues == 'Other'){
            component.set("v.showOtherInPutBox", true);
        }else{
            component.set("v.showOtherInPutBox", false);
        }
    },
    
    checkCountryValue :function(component,event,helper){
        
    
        var wrapper=component.get("v.oMainWrapper");
        
         var customerCountryValue=wrapper.objLead.Customer_Country__c;
        console.log('customerCountryValue:'+customerCountryValue);
        
         var countryDiv=component.find("countryDiv");
            
        if(customerCountryValue=='choose..' || customerCountryValue==undefined || customerCountryValue=='')
        {
            $A.util.removeClass(countryDiv,"slds-hide");
        }
        else
        {
            $A.util.addClass(countryDiv,"slds-hide");
        }
    },
    ShowZipCodeError :function(component,event,helper){
        var zipCode=component.find("ZipSpan");
           
        var wrapper=component.get("v.oMainWrapper");
        var zipValue=wrapper.objLead.Customer_Headquarters_Zip_Code__c;
        
        if(zipValue==undefined || zipValue=='')
        {
           $A.util.addClass(zipCode,"AstricColor");
        }
        else
        {
            $A.util.removeClass(zipCode,"AstricColor");
        }
    }
})