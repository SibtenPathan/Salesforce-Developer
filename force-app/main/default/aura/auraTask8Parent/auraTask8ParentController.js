({
    handleImageUpload : function(component, event, helper) {
        var imageData = event.getParam("imageData");  // Get the image data from the event
        
        console.log("Received Base64 Image Data in Parent: ", imageData);  // Log the received data
        
        if (imageData) {
            // Ensure proper data URL format
            if (!imageData.startsWith("data:image")) {
                imageData = "data:image/png;base64," + imageData;
            }
            component.set("v.uploadedImage", imageData);  // Set the image data in the parent's attribute
            console.log("Uploaded image data set to attribute in Parent");
        }
    }
})
