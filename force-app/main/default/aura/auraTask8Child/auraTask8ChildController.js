({
    sendMessage: function (component, event, helper) {
        var baseString = component.get("v.baseString"); // Get base64 string
        var compEvent = component.getEvent("sendImageString"); // Get event instance
        compEvent.setParams({ "imageUrl": baseString }); // Set event parameter with base64 string
        compEvent.fire(); // Fire the event
    },

    handleFilesChange: function (component, event) {
        var files = event.getSource().get("v.files");

        if (files.length > 0) {
            var file = files[0];
            var reader = new FileReader();

            // When file is read, convert to base64 and store in the attribute
            reader.onloadend = function () {
                var base64String = reader.result; // Keep the full data URL
                component.set("v.baseString", base64String);
                console.log("Base64 Image String:", base64String);

            };

            // Read the file as a data URL (Base64)
            reader.readAsDataURL(file);
        }
    }
})
