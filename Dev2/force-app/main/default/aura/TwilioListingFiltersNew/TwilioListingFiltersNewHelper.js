({
    
    getFilterOptions : function (cmp) {
        var expandLevel = 1;
        var srows = cmp.get("v.selecteditems");
        var selectedrows = [];
        var action = cmp.get("c.getFilterOptions");
        action.setParams({ recordType : cmp.get("v.tabName") });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var data = response.getReturnValue();
                //Change "Contacts" key to "_children"
                for(var i=0; i<data.length; i++) {
                    var subData = data[i]['children'];
                    
                    if(!$A.util.isUndefinedOrNull(subData) 
                       && !$A.util.isUndefinedOrNull(subData.length) 
                       && subData.length >0 ){
                        
                        for(var j=0; j<subData.length; j++){
                            if(srows != null){
                                var val = subData[j]['fieldName'];
                                //If the field name is same
                                var selectedRow = srows[val] ;
                                if(selectedRow != null){
                                    if(selectedRow.includes(subData[j]['value'])){
                                        selectedrows.push(subData[j]['value']);
                                        if(expandLevel < 2){
                                            expandLevel = 2;
                                        }
                                    }
                                }
                            }
                            
                            if(!$A.util.isUndefinedOrNull(subData[j]['children'])){
                                if(srows != null){
                                    var arr = subData[j]['children'];
                                    if(Array.isArray(arr) && arr.length > 0){
                                        for(var k=0; k<arr.length; k++){
                                            var fn = arr[k]['fieldName'];
                                            var selectedRow1 = srows[fn] ;
                                            if(selectedRow1 != null){
                                                if(selectedRow1.includes(arr[k]['value'])){
                                                    selectedrows.push(arr[k]['value']);
                                                    if(expandLevel < 3){
                                                        expandLevel = 3;
                                                    }
                                                }
                                            }
                                        }
                                    }   
                                    
                                }
                                subData[j]._children = subData[j]['children'];
                                delete subData[j].children;
                            }
                            
                        }
                    } 
                    if(!$A.util.isUndefinedOrNull(subData)){
                        data[i]._children = subData;
                        delete data[i].children;
                    }
                    
                }
                
                
                
                
                //var data =[{"fieldName":"Twilio_Technologies__c","label":"Twilio Technologies","value":"Twilio Technologies","_children":[{"fieldName":"Twilio_Technologies__c","label":"Programmable SMS","value":"Programmable SMS"},{"fieldName":"Twilio_Technologies__c","label":"Programmable Voice","value":"Programmable Voice"},{"fieldName":"Twilio_Technologies__c","label":"Programmable Video","value":"Programmable Video"},{"fieldName":"Twilio_Technologies__c","label":"Programmable Chat","value":"Programmable Chat"},{"fieldName":"Twilio_Technologies__c","label":"Programmable Fax","value":"Programmable Fax"},{"fieldName":"Twilio_Technologies__c","label":"Programmable Wireless","value":"Programmable Wireless"},{"fieldName":"Twilio_Technologies__c","label":"Lookup","value":"Lookup"},{"fieldName":"Twilio_Technologies__c","label":"Authy","value":"Authy"},{"fieldName":"Twilio_Technologies__c","label":"Verify","value":"Verify"},{"fieldName":"Twilio_Technologies__c","label":"TaskRouter","value":"TaskRouter"},{"fieldName":"Twilio_Technologies__c","label":"Notify","value":"Notify"},{"fieldName":"Twilio_Technologies__c","label":"Proxy","value":"Proxy"},{"fieldName":"Twilio_Technologies__c","label":"Studio","value":"Studio"},{"fieldName":"Twilio_Technologies__c","label":"Sync","value":"Sync"},{"fieldName":"Twilio_Technologies__c","label":"Flex","value":"Flex"}]},{"fieldName":"Industries__c","label":"Industries","value":"Industries","_children":[{"fieldName":"Industries__c","label":"Financial Services","value":"Financial Services"},{"fieldName":"Industries__c","label":"Healthcare & Life Sciences","value":"Healthcare & Life Sciences"},{"fieldName":"Industries__c","label":"Government","value":"Government"},{"fieldName":"Industries__c","label":"Manufacturing","value":"Manufacturing"},{"fieldName":"Industries__c","label":"Communications","value":"Communications"},{"fieldName":"Industries__c","label":"Media","value":"Media"},{"fieldName":"Industries__c","label":"Education","value":"Education"},{"fieldName":"Industries__c","label":"Retail","value":"Retail"},{"fieldName":"Industries__c","label":"Travel, Transportation & Hospitality","value":"Travel, Transportation & Hospitality"},{"fieldName":"Industries__c","label":"Real Estate","value":"Real Estate"},{"fieldName":"Industries__c","label":"Professional Services","value":"Professional Services"},{"fieldName":"Industries__c","label":"Nonprofits","value":"Nonprofits"}]}];
                var config = cmp.get("v.treeConfig");
                config.expandLevel=expandLevel;
                cmp.get("v.config");
                cmp.set("v.selectedValues", selectedrows);
                cmp.set('v.gridData', data);
               
                // var myCmp = cmp.find('accountTree');
                
                
                
            }
            // error handling when state is "INCOMPLETE" or "ERROR"
        });
        $A.enqueueAction(action);
    },
    
    applyFilter : function(cmp, event, helper){
        var selectedRows = cmp.find('accountTree').getSelectedRows();
        var filterGroupList = {};
       
        
        
        for (var i = 0; i < selectedRows.length; i++){
            var selectedFilterGroup = selectedRows[i].fieldName;
            var selectedFilter=selectedRows[i].value;
            
            
            
            if(filterGroupList[selectedFilterGroup] == null){
                filterGroupList[selectedFilterGroup] = [selectedFilter];
            }else{
                if(filterGroupList[selectedFilterGroup].includes(selectedFilter)){
                    filterGroupList[selectedFilterGroup].splice(filterGroupList[selectedFilterGroup].indexOf(selectedFilter), 1);
                    if(filterGroupList[selectedFilterGroup].length == 0){
                        delete filterGroupList[selectedFilterGroup];
                    }
                }else{
                    filterGroupList[selectedFilterGroup].push(selectedFilter);
                }
            }
            
            if(selectedRows[i].hasChildren){
                // result = data.filter(a => a._children.some(t => t.fieldName.includes(selectedRows[i].fieldName)));
                var result;
                if(selectedRows[i].level==1){
                    result= data.filter(p => p._children.some(s => s.fieldName === selectedRows[i].fieldName));
                } else if(selectedRows[i].level==2) {
                }
            }
            
        }
        
        var isMob=cmp.get("v.isMobile");
        var filterListingEvent =( !isMob)?cmp.getEvent("evt_FilterListing"):$A.get("e.c:evt_FilterListingModal");
        
        
        filterListingEvent.setParams({ 
            "filterGroupList":filterGroupList
        });
        filterListingEvent.fire();
        if(isMob){
            cmp.find("filterOverlayLib1").notifyClose();
        }
    }
})