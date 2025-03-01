({
    handleMessage : function(component, event, helper) {
        var message = event.getParam("imageUrl"); // Get event parameter
        console.log("message: ",message);
        
        component.set("v.receivedMessage", message); // Set received value
    }
})
