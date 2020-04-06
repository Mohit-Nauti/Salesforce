({
    doInitHelper : function(component, event, helper) {
        console.log('Helper Load');
        var action = component.get("c.onloadLead");
        action.setParams({            
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = JSON.parse(response.getReturnValue());
                var result2 = result.lstofMultiPV;
                console.log('result'+JSON.stringify(result));
                console.log('result2'+JSON.stringify(result2));
                
                component.set("v.oMainWrapper",JSON.parse(response.getReturnValue())); 
                console.log('result3',JSON.parse(response.getReturnValue()));
                var plValues = [];
                for (var i = 0; i < result2.length; i++) {
                    plValues.push({
                        label: result2[i],
                        value: result2[i]
                    });
                }
                component.set("v.GenreList", plValues);
            }else{
                Console.log('Getting error in do INit');
            }
        });
        $A.enqueueAction(action);
    },
     saveHelper : function(component, event, helper) {
        
         //show spinner
         component.set("v.showSpinner",true);
              
         var tmpLead = component.get("v.oMainWrapper");
         
         console.log('tmpLead...'+JSON.stringify(tmpLead.objLead));
         
         var leadObject=tmpLead.objLead;
        
         if(leadObject.Partner_Deal_Type__c!=null && leadObject.Partner_Sales_Contact_Email__c!=null && leadObject.Partner_Sales_Contact_Title__c!=null && leadObject.Partner_Sales_Contact_Phone__c!=null && leadObject.Partner_Sales_Contact_Name__c!=null && leadObject.Twilio_Estimated_Amount__c!=null && leadObject.Company_Name__c!=null && leadObject.Contact_Email_Text__c!=null && leadObject.Contact_Name_Text__c!=null && leadObject.Launch_Date__c!=null && leadObject.Customer_Title__c!=null && tmpLead.strCNOfEmp!=null && leadObject.Customer_Country__c!=null && leadObject.FY_16_Primary_Product_Input__c!=null
            && leadObject.Partner_Notes__c!=null && leadObject.Customer_Headquarters_Zip_Code__c!=null)
         {
          
             console.log('inside saving record');
             var action = component.get("c.saveLeadDetails"); 
             var mpl = component.get("v.selectedGenreList");
             
             console.log('mpl...'+JSON.stringify(mpl));
             action.setParams({
                 strLead : JSON.stringify(tmpLead.objLead),
                 mainWrap : JSON.stringify(component.get("v.oMainWrapper")),
                 mpicklist : mpl,
             });
             
             action.setCallback(this, function(response){
                 
                 console.log('status...'+JSON.stringify(response));
                 
                 if(response.getState() === "SUCCESS") {
                     console.log('Lead Record Saved');
                     
                     if(response.getReturnValue()==null)
                     {
                         //Hiding the spinner
                         component.set("v.showSpinner",false);
                         
                         //showing the spinner
                         helper.showToast(component,event,helper,"Error","error","Something went wrong");
                          
                     }
                     else
                     {
                         //Hiding the spinner
                         component.set("v.showSpinner",false);
                         
                         console.log('response inside not null::'+response.getReturnValue());
                     
                         //showing the spinner
                         helper.showToast(component,event,helper,"Success","success","Successfully created");
                         
                         //Refreshing the component
                         $A.get('e.force:refreshView').fire();
                        // window.open("https://twlo--bopsydev2.lightning.force.com/lightning/r/Lead/"+response.getReturnValue()+"/view","_self");
                         
                     }
                  }
                 else{
                     
                     //Hiding the spinner
                     component.set("v.showSpinner",false);
                     
                     //showing the spinner
                     helper.showToast(component,event,helper,"Error","error","Something went wrong");
                     
                     console.log('Error State while saving ');
                 }                
             });
             $A.enqueueAction(action);
         }//else to show the error when fields are not filled
         else
         {
             //Hiding the spinner
             component.set("v.showSpinner",false);
             
             console.log('inside error');
             component.set("v.showError","Fill all required fields");
         }
    }
    ,
    showToast : function(component,event,helper,title,type,message) {
       
        var toastEvent=$A.get("e.force:showToast");
        
        console.log('event:::'+toastEvent);
        
        toastEvent.setParams({
            "title":title,
            "type":type,
            "message":message,
            "duration":5000
        });
        
        toastEvent.fire();
    }
})