({
	doInit : function(cmp, e, helper) {
        helper.getFilterOptions(cmp);
	},
    
    selectFilter: function(cmp, e, helper) {
        debugger;
        var el = e.currentTarget,
            filterName = el.dataset.filter,
        	filterGroup = el.dataset.filtergroup,
            filterListingEvent = cmp.getEvent("evt_FilterListing");
		        filterListingEvent.setParams({ 
        	    	"filterName" : filterName,
	            	"filterGroup" : filterGroup 
        });
        filterListingEvent.fire();
    },
    
    clearAll: function(cmp, e, helper) {
        var checkboxes = cmp.find('filter-checkbox');
        for(var i=0; i<checkboxes.length; i++){
            var el = checkboxes[i].getElement();
            if(el.checked == true){
                var event = new MouseEvent('click', {});
                el.dispatchEvent(event);
            }
        }
    }
})