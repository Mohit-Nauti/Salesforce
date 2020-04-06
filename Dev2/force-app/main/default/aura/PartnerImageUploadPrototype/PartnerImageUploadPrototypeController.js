({
    imageLoaded: function(cmp, event, helper) {
        //responds to onload event on file input
        previewImage = window.document.getElementById('previewImage');
        var height = previewImage.height,
            width = previewImage.width,
            maxHeight = cmp.get('v.MaxHeight'),
            maxWidth = cmp.get('v.MaxWidth'),
            previewDiv = cmp.find('previewDiv');

        if (height !== maxHeight || width !== maxWidth) {
            $A.util.addClass(previewDiv, 'hidden');
            cmp.set('v.DataUrl', '');
            cmp.set('v.ImageData', '');
            helper.showToast({
                "title": 'Bad image size: ' + height + ' x ' + width,
                "message": 'Image should be ' + maxHeight + ' x ' + maxWidth + ' exactly',
                "type": "error",
                "mode": "sticky"
            });
            return;
        }
        $A.util.removeClass(previewDiv, 'hidden');
        cmp.set('v.ImageHeight', height);
        cmp.set('v.ImageWidth', width);

        helper.showToast({
            "title": "Success!",
            "message": "Good Stuff",
            "type": "success"
        })

    },
    imageChanged: function(cmp, event, helper) {
        //responds to onchange event on file input
        var files = cmp.get('v.FileList'),
            previewDiv = cmp.find('previewDiv');

        console.log('files', files[0]);

        var reader = new FileReader();

        reader.onload = function(e) {

            var dataUrl = e.target.result,
                imageData = dataUrl.split(',')[1];
            cmp.set('v.DataUrl', dataUrl);
            cmp.set('v.ImageData', imageData);

        }

        $A.util.addClass(previewDiv, 'hidden');
        reader.readAsDataURL(files[0]);
    }
})