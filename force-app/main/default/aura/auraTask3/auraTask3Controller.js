({
    handleKeyUp1: function(component, event, helper) {
        if (event.keyCode === 13) { // Check if Enter key is pressed
            helper.handleKeyUp1(component)
            .then(() => helper.getAccounts1(component))
            .catch(error => console.error("Error in handleKeyUp1:", error));
        }
    },

    setAccount1: function(component, event, helper){
        helper.setAccount1(component, event)
        .then(() => helper.getContacts1(component))
        .catch(error => console.log("Error in setAccount1:", error));
    },


    handleKeyUp2: function(component, event, helper) {
        if (event.keyCode === 13) { // Check if Enter key is pressed
            helper.handleKeyUp2(component)
                .then(() => helper.getAccounts2(component))
                .catch(error => console.error("Error in handleKeyUp2:", error));
        }
    },

    setAccount2: function(component, event, helper){
        helper.setAccount2(component, event)
            .then(() => helper.getContacts2(component))
            .catch(error => console.log("Error in setAccount2:", error));
    },

    handleDragStart: function(component, event) {
        var contactId = event.target.dataset.id;
        component.set("v.draggedContact", contactId);
    },

    handleDragOver: function(component, event) {
        event.preventDefault(); // Allows the drop event to occur
    },

    handleDrop: function(component, event, helper) {
        helper.drop(component, event)
    }
})
