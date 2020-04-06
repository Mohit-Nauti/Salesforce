({

    processSearch: function(cmp, e, helper){

        var searchTerm = e.getParam("searchTerm");
        cmp.set('v.searchTerm', searchTerm);
        if(searchTerm == ''){
            helper.resetTotals(cmp,helper);
        }else{
            console.log('getting search stats');
            helper.getSearchStats(cmp,helper);
        }
        
    },
   

    onRender: function(cmp, e, helper) {
       // console.log('render tab container');
	}

})