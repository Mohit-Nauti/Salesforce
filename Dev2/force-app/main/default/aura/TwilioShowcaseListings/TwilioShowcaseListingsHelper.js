({
    getListings: function(cmp) {
        console.log('getListings in twilioShowcaseListings');
        var action = cmp.get("c.retrieveListings");
        action.setParams({ recordType : cmp.get("v.tabName") });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var res = response.getReturnValue();
                console.log('******res**********');
                console.log(res);
                cmp.set('v.listings', res);
                this.setMaxPageSize(cmp);
            } else {
                console.log('error');
            }
            
            
            
            var sortedListingRecords = []; // contains all arrays.
            var sortedGoldListingRecords = [];  //Contains gold listing record
            var sortedSilverListingRecords = []; //Contains silver listing record
            var sortedBronzeListingRecords = []; //Contains bronze listing record
            var sortedNonPartnerListingRecords = []; //Contains other listing record

            for(let i=0; i<res.length;i++){
                
                if(res[i].partnerListing.Partner_Tier__c == "Gold"){
                    console.log('Gold');
                    sortedGoldListingRecords.push(res[i]);
                } else if(res[i].partnerListing.Partner_Tier__c == "Silver"){
                    console.log('Silver');
                    sortedSilverListingRecords.push(res[i]);
                } else if(res[i].partnerListing.Partner_Tier__c == "Bronze"){
                    sortedBronzeListingRecords.push(res[i]);
                }else{
                    sortedNonPartnerListingRecords.push(res[i]);                
                }
            }
            
            sortedListingRecords = sortedGoldListingRecords.concat(sortedSilverListingRecords).concat(sortedBronzeListingRecords).concat(sortedNonPartnerListingRecords);
            cmp.set('v.filteredListings', sortedListingRecords);
            console.log('++++++++++++');
            console.log(sortedListingRecords);   
            this.renderListingSubsethelper(cmp);
        });
        $A.enqueueAction(action);
    },
    
    setMaxPageSize: function(cmp) {
        var listingsPerPage = cmp.get("v.listingsPerPage"),
            filteredListings = cmp.get("v.listings");
        cmp.set("v.maxPage", Math.floor((filteredListings.length+(listingsPerPage-1))/listingsPerPage));
    },
    
    renderListingSubsethelper: function(cmp) {
        console.log('---------');
        var filteredListings = cmp.get("v.filteredListings"),
           
            pageNumber = cmp.get("v.pageNumber"),
           
            listingsPerPage = cmp.get("v.listingsPerPage"),
            pageRecords = filteredListings.slice((pageNumber-1)*listingsPerPage, pageNumber*listingsPerPage);
        console.log('***********');
         console.log(pageNumber);
         console.log(filteredListings)
        console.log(pageRecords);
        
        cmp.set("v.listingsSubset", pageRecords);
        
    },
    
    modifyFilters: function(cmp, selectedFilter, selectedFilterGroup,filterGroupListParam) {
        //debugger;
        var listings = cmp.get('v.listings'),
            filteredListings = [],
            filterGroupList = cmp.get('v.filterGroupList');
        if($A.util.isUndefinedOrNull(filterGroupListParam)){
            if(filterGroupList == null){
                filterGroupList = {};
            }
            
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
        } else {
            filterGroupList = filterGroupListParam ;
        }
        cmp.set('v.filterGroupList', filterGroupList);
        
        //If we have no filters, show all listings.
        if($A.util.isEmpty(filterGroupList)){
            cmp.set('v.filteredListings', cmp.get('v.listings'));
        }else{
            for(var i=0;i<listings.length;i++){
                //console.log('listing',listings[i]);
                var booleanArray = [];
                for(var key in filterGroupList) {
                    var isValidElement = false;
                    if(listings[i].partnerListing[key]){
                        for(var x=0; x<filterGroupList[key].length;x++){
                            if((listings[i].partnerListing[key].includes(filterGroupList[key][x]))){
                                isValidElement=true;
                            }
                        }
                        booleanArray.push(isValidElement);
                    }
                }
                //console.log('XYZ',booleanArray);
                var temp = true;
                if(booleanArray.length >0){
                    for(var y=0; y<booleanArray.length;y++){
                        temp = temp && booleanArray[y];
                    }
                }else {
                    temp = false;
                }
                if(temp){
                    filteredListings.push(listings[i]);
                } 
            }
            // Update the UI with the new set of listings.
            if(filteredListings.length > 0) {
                cmp.set('v.filteredListings',filteredListings);
            }else{
                cmp.set('v.filteredListings',[]);
            }
        }
        
        this.setMaxPageSize(cmp);
        this.renderListingSubsethelper(cmp);
    },
    
    processSearch: function(cmp) {
        console.log('processSearch');
        console.log('tabName--->'+cmp.get('v.tabName'));
        var searchTerm = cmp.get('v.searchTerm');
        var action = cmp.get("c.searchListings");
        action.setParams({
            recordType : cmp.get("v.tabName"),
            searchTerm : searchTerm
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var res = response.getReturnValue();
                cmp.set('v.listings', res);
                cmp.set('v.filteredListings', res);
                this.setMaxPageSize(cmp);
                //console.log(res);
            } else {
                //console.log('error');
            }
            
            var sortedListingRecords = []; // contains all arrays.
            var sortedGoldListingRecords = [];  //Contains gold listing record
            var sortedSilverListingRecords = []; //Contains silver listing record
            var sortedBronzeListingRecords = []; //Contains bronze listing record
            var sortedNonPartnerListingRecords = []; //Contains other listing record

            for(let i=0; i<res.length;i++){
                
                if(res[i].partnerListing.Partner_Tier__c == "Gold"){
                    console.log('Gold');
                    sortedGoldListingRecords.push(res[i]);
                } else if(res[i].partnerListing.Partner_Tier__c == "Silver"){
                    console.log('Silver');
                    sortedSilverListingRecords.push(res[i]);
                } else if(res[i].partnerListing.Partner_Tier__c == "Bronze"){
                    sortedBronzeListingRecords.push(res[i]);
                }else{
                    sortedNonPartnerListingRecords.push(res[i]);                
                }
            }
            
            sortedListingRecords = sortedGoldListingRecords.concat(sortedSilverListingRecords).concat(sortedBronzeListingRecords).concat(sortedNonPartnerListingRecords);
            cmp.set('v.filteredListings', sortedListingRecords);
            console.log('++++++++++++');
            console.log(sortedListingRecords);   
            
            this.renderListingSubsethelper(cmp);
        });
        $A.enqueueAction(action);
    }
    
    
})