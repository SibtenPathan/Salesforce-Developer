({
    handleFileChange : function(component, event, helper) {
        var file = event.getSource().get("v.files")[0]; // Get the uploaded file
        
        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                try {
                    var base64Data = e.target.result;
                    
                    // Fire the component event to pass image data to the parent
                    var appEvent = $A.get("e.c:ImageUploadEvent");
                    appEvent.setParams({ imageData: base64Data });
                    appEvent.fire();
                    // var cmpEvent = component.getEvent("imageUploadEvent");
                    // cmpEvent.setParams({ imageData: base64Data });
                    // cmpEvent.fire();
                    console.log("Event fired from Child with image data");
                } catch (error) {
                    console.log("Error processing file: ", error.message);
                }
            };
            reader.readAsDataURL(file); // Convert file to Base64
        } else {
            console.log("No file selected");
        }
    }
})
