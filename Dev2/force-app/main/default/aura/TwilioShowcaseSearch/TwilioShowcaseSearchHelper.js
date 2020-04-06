({
	searchListings : function(cmp) {
		var searchEvt = $A.get("e.c:evt_SearchSubmitted");
		searchEvt.setParams({ "searchTerm" : cmp.get('v.searchTerm') });
		searchEvt.fire();
		var clearSearchIcon = cmp.find('clearSearch');
		$A.util.removeClass(clearSearchIcon, 'slds-hide');

        console.log('inside search listing helper');
		this.clearFilters();
	},

	clearSearch : function(cmp) {
		cmp.set("v.searchTerm", '');
		this.searchListings(cmp);
		var clearSearchIcon = cmp.find('clearSearch');
		$A.util.addClass(clearSearchIcon, 'slds-hide');

		this.clearFilters();
	},
    

	clearFilters : function() {
		var clearFiltersEvent = $A.get("e.c:evt_ClearListingFilters");
		clearFiltersEvent.fire();
	}
})