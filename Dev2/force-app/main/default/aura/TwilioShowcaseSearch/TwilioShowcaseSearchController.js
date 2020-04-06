({

	doInit : function(cmp, e, helper){
		
	},

	searchListings : function(cmp, e, helper) {
		helper.searchListings(cmp);
        console.log('search listing method');
	},

	searchTermChanged: function(cmp, e, helper){
		var searchTerm = cmp.get('v.searchTerm').replace(/^\s+$/g, ""),
			searchDisabled;
		cmp.set('v.searchTerm', searchTerm);
		if(searchTerm.length < 3){
			searchDisabled = true;
		}else{
			searchDisabled = false;
		}
		cmp.set('v.searchDisabled', searchDisabled);
	},

	clearSearch: function(cmp, e, helper){
		helper.clearSearch(cmp);
	},
    keyCheck: function(cmp, event, helper){
         var searchTerm = cmp.get('v.searchTerm');
        if(!$A.util.isUndefinedOrNull(searchTerm)){
            searchTerm = cmp.get('v.searchTerm').replace(/^\s+$/g, "");
        }
        
		
		//console.log('here-->');
         if(event.which == 13 && searchTerm.length > 2 ) {
             
         	helper.searchListings(cmp);
        }
    }
})