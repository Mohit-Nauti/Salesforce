({
    getCheckedNodes : function(nodes,helper){
        var checkedNodes = [];
        if(Array.isArray(nodes) && nodes.length > 0){
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                var childCheckedNodes = node.getSelectedRows();
                if(!$A.util.isUndefinedOrNull(childCheckedNodes)){
                    if (childCheckedNodes.length > 0){
                        checkedNodes = checkedNodes.concat(childCheckedNodes);
                    }
                } 
            }
        } else {
            var node = nodes;
            var childCheckedNodes = node.getSelectedRows();
            if(!$A.util.isUndefinedOrNull(childCheckedNodes)){
                if (childCheckedNodes.length > 0){
                    checkedNodes = checkedNodes.concat(childCheckedNodes);
                }
            } 
        }
        return checkedNodes;
    },
    clearNodes : function(nodes,helper){
        
        if(Array.isArray(nodes) && nodes.length > 0){
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                node.clearAll();
            }
        } else {
            var node = nodes;
            node.clearAll(); 
        }
        
    }
})