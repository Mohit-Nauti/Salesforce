({
    showToast: function(params) {
        return new Promise($A.getCallback((resolve, reject) => {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams(params);
            toastEvent.fire();
            resolve();
        }));
    }
})