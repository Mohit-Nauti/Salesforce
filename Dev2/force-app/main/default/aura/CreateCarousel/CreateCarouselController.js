({
	handleSubmit: function(component, event, helper) {
         var asset = new Object();
            
            console.log('handle submit');
        event.preventDefault();       // stop the form from submitting
       // console.log('Load Event' + JSON.stringify(event.getParams()));
        var fields = event.getParam('fields');
        //console.log('Load Event' + JSON.stringify(fields));
        fields.Partner_Listing__c = component.get("v.listingrecordId");
        
       
     
        component.find('carouselForm').submit(fields);
        
        
    },
 
    handleFilesChange: function(component, event, helper) {
        
        var fileName = 'No File Selected..';
        if (event.getSource().get("v.files").length > 0) {
            fileName = event.getSource().get("v.files")[0]['name'];
        }
        component.set("v.fileName", fileName);
    },
    
    handleSuccess:function(component, event, helper) {
        // console.log('handleSuccess');
        var payload = event.getParams().response;
       var files = component.get('v.FileList');
       // console.log("1 heere");
        component.set("v.parentId",payload.id);
       // console.log("2 heere"+payload.id);
         var imageData = component.get("v.imageData");               
        
                        helper.uploadImg(component, files[0], imageData);
                    
    },
    handleError:function(component, event, helper) {
        console.log('ERROR!!');
    },
    handleUpload: function(component, event, helper) {
        var files = component.get('v.FileList');
        helper.readFile(component, helper, files[0]);
},
     handleOnLoad: function(component, event, helper) {
       
}
    
})