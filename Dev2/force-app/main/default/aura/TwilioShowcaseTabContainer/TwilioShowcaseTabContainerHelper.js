({   
    
    getSearchStats: function(cmp,helper){
        var action = cmp.get("c.retrieveSearchStats");
        action.setParams({ searchTerm : cmp.get('v.searchTerm') });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var res = response.getReturnValue(); 
                var totalCount = 0 ;
                for(var i=0;i<res.length;i++){
                    totalCount = totalCount + res[i].count;
                    console.log(res[i].count + 'totalCount-->>>>>>>>>>>>>'+totalCount);
                    console.log('res[i].type-->'+res[i].type);
                    if(res[i].type == 'App'){
                        
                        cmp.set('v.totalApps', res[i].count);
                        var l =  $A.get('$Label.c.Comd_TSC_Apps');
                        helper.addTabLabel(cmp,"appTab",l+" ("+ res[i].count+")");
                        
                           
                    }else if(res[i].type == 'Addon'){
                         var l =  $A.get('$Label.c.Comd_TSC_AddOns');
                        cmp.set('v.totalAddons', res[i].count);
                        helper.addTabLabel(cmp,"addOntab", l+" ("+ res[i].count+")");
                    }else if(res[i].type == 'Service'){
                         var l =   $A.get('$Label.c.Comd_TSC_Consultants');
                        cmp.set('v.totalServices', res[i].count);
                        helper.addTabLabel(cmp,"consultantTab",l+" ("+ res[i].count+")");
                    }else if( res[i].type == 'View All' ){
                       /* var l =  'View All' ;
                        cmp.set('v.allPartnerServices', res[i].count);
                        helper.addTabLabel(cmp,"viewAllTab",l+" ("+ res[i].count+")");*/
                        
                        //var l = $A.get('$Label.c.Comd_TSC_FlexR');
                        //cmp.set('v.totalFlex', res[i].count);
                        //helper.addTabLabel(cmp, "flextab", l+" ("+ res[i].count+")")
                    }
                }
                console.log('totalCount-->'+totalCount);
                var l =  'View All' ;
                cmp.set('v.allPartnerServices', totalCount);
                helper.addTabLabel(cmp,"viewAllTab",l+" ("+ totalCount+")");
                		
            } else {
                console.log('error');
            }
        });
        $A.enqueueAction(action);
    },
    
    resetTotals : function(cmp,helper){
        cmp.set('v.totalApps', null);
        helper.addTabLabel(cmp,"appTab",$A.get('$Label.c.Comd_TSC_Apps'));
        
        cmp.set('v.totalAddons', null);
        helper.addTabLabel(cmp,"addOntab",$A.get('$Label.c.Comd_TSC_AddOns'));
        
        cmp.set('v.totalServices', null);
        helper.addTabLabel(cmp,"consultantTab",$A.get('$Label.c.Comd_TSC_Consultants'));
        
        cmp.set('v.allPartnerServices', null);
        helper.addTabLabel(cmp,"viewAllTab",'View All');
    },
    addTabLabel: function(cmp,tabName, label){
        try{
        var tabCmp = cmp.find(tabName);
            if(!$A.util.isUndefinedOrNull(tabCmp)){
                
           
        $A.createComponent("aura:text",{ "value": label },
             function(newButton, status, errorMessage){
                               if (status === "SUCCESS") {
                                   tabCmp.set("v.label",newButton);
                               }
                               else if (status === "INCOMPLETE") {
                                   console.log("No response from server or client is offline.")
                               }
                                   else if (status === "ERROR") {
                                       console.log("Error: " + errorMessage);
                                   }
                           }
          );
                 }
            }catch(e){console.log(e)}
    }
    
})