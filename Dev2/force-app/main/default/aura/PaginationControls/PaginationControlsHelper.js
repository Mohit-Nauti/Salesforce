({
	setPageNumberRange : function(cmp) {
		var maxPageNumber = cmp.get('v.maxPageNumber'),
            pageNumbers = [];
            
        for(var i=0;i<maxPageNumber;i++){
            pageNumbers.push(i+1);
        }
        cmp.set("v.pageNumbers", pageNumbers);
        cmp.set('v.currentPageNumber', 1);
	}
})