({
    createContact : function(component, event, helper) {
        console.log('OUTPUT : ', 'createContact called');
        component.set("v.isLoading", true);
        
        let contactRecord = component.get("v.contactRecord");
        let action = component.get("c.createContactRecord");
        action.setParams({ contact : contactRecord });

        action.setCallback(this, function(response) {
            let state = response.getState();
            component.set("v.isLoading", false);

            if (state === "SUCCESS") {
                let toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "Contact created successfully",
                    "type": "success"
                });
                toastEvent.fire();

                component.set("v.contactRecord", { 'sobjectType': 'Contact' });
            } else {
                let errors = response.getError();
                let message = (errors && errors[0] && errors[0].message) ? errors[0].message : "Unknown error";

                let toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Error!",
                    "message": message,
                    "type": "error"
                });
                toastEvent.fire();
            }
        });

        $A.enqueueAction(action);
    }
})
