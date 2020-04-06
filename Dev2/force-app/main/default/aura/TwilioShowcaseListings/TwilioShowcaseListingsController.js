({
	doInit : function(cmp, e, helper) {
        //var x = document.getElementById("hideIn");
        //x.style.display = "none";
        console.log('searchTerm-->'+cmp.get('v.searchTerm'));
        if(cmp.get('v.searchTerm') != ''){
            helper.processSearch(cmp);
        }else{
            helper.getListings(cmp);
        }
        //x.style.display = "block";
    },

    modifyFilters: function(cmp, e, helper){
        var selectedFilter = e.getParam("filterName"),
            selectedFilterGroup= e.getParam("filterGroup"),
             filterGroupList = e.getParam("filterGroupList");
        helper.modifyFilters(cmp, selectedFilter, selectedFilterGroup,filterGroupList);
        var overlayPanel = cmp.get('v.overlayPanel');
       
        if(overlayPanel != null){
           
           
             overlayPanel.close();
        }
           
    },

    renderListingSubset: function(cmp, e, helper) {
        helper.renderListingSubsethelper(cmp);
    },

    processSearch: function(cmp, e, helper){
        helper.processSearch(cmp);
    },

    loadListingDetail: function(cmp, e, helper){
        var el = e.currentTarget,
            recordId = el.dataset.recordid,
            urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": "/partner-listing/"+recordId,
            "isredirect": true
        });
        urlEvent.fire();
    },
    showFilter:function(component, e, helper){
         var modalBody;
        $A.createComponent("c:TwilioListingFiltersNew", {tabName:component.get("v.tabName"),
                                                         isMobile:true,
                                                         selecteditems:component.get("v.filterGroupList")},
           function(content, status) {
               if (status === "SUCCESS") {
                   modalBody = content;
                   component.find('filterOverlayLib').showCustomModal({
                       header: "Apply Filters",
                       body: modalBody, 
                       showCloseButton: true,
                       cssClass: "mymodal",
                       closeCallback: function() {
                          
                       }
                   }).then(function(overlay){
                        component.set('v.overlayPanel', overlay);
                       
                   })
               }                               
           });
        
    }

})