({
    doInit: function(cmp, event, helper){
        helper.setPageNumberRange(cmp);
    },
    setPageNumberRange: function(cmp, event, helper){
        helper.setPageNumberRange(cmp);
    },
    firstPage: function(cmp, event, helper) {
        cmp.set("v.currentPageNumber", 1);
    },
    prevPage: function(cmp, event, helper) {
        cmp.set("v.currentPageNumber", Math.max(cmp.get("v.currentPageNumber")-1, 1));
    },
    nextPage: function(cmp, event, helper) {
        cmp.set("v.currentPageNumber", Math.min(cmp.get("v.currentPageNumber")+1, cmp.get("v.maxPageNumber")));
    },
    lastPage: function(cmp, event, helper) {
        cmp.set("v.currentPageNumber", cmp.get("v.maxPageNumber"));
    },
    setPageNumber: function(cmp, e, helper){
        var el = e.currentTarget;
        var pageNumber = el.dataset.pagenumber;
        // We have to convert the pagenumber to an int here for comparison later
        cmp.set("v.currentPageNumber", parseInt(pageNumber));
        //$A.get('e.force:refreshView').fire();
    }
})