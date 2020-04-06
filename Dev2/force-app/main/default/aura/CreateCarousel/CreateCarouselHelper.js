({
    
    readFile: function(component, helper, file) {
        // console.log('file');
        // console.log(file);
        if (!file) return;
        if (!file.type.match(/(image.*)/)) {
            // deal with non-images
        }
        var reader = new FileReader();
        reader.onload = function(e) {
            
            var dataURL = e.target.result,
                imageData = dataURL.split(',')[1];
            
            component.set("v.imageData", imageData);
            
        };
        reader.readAsDataURL(file);
    },
    
    
    uploadImg: function(component, file, base64Data ) {
       // console.log("4heere"+base64Data);
        var action = component.get("c.saveFile");
        action.setParams({
            parentId: component.get("v.parentId"),
            fileName: file.name,
            base64Data: base64Data,
            contentType: file.type
        });
       
        action.setCallback(this, (response) => {
            var state = response.getState();
            
            if (state === 'SUCCESS') {
            
             var closeModalEvent = $A.get("e.c:CarouselModalClose");

             closeModalEvent.fire();
            
        } else if (state === 'ERROR') {
            
            var errors = response.getError();
            
            console.error('error uploading:', errors[0]);
            reject(errors[0]);
            
        }
        
    });
    
    $A.enqueueAction(action);
    
    
}
 })