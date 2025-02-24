({
    createAccountHelp: function (component) {
        try {
            let accountRecord = component.get("v.accountRecord");
            if (accountRecord.Name != null) {
                console.log('accountRecord :: ', accountRecord);

                let action = component.get("c.createAccountRecord");
                action.setParams({ account: accountRecord });

                action.setCallback(this, function (response) {
                    let state = response.getState();
                    let createdAccount = response.getReturnValue();
                    console.log('state :: ', state);
                    if (state === "SUCCESS" && createdAccount) {
                        console.log("Id: " + createdAccount.Id);
                        component.set("v.accId", createdAccount.Id);

                        let toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "title": "Success!",
                            "message": "Account created successfully",
                            "type": "success"
                        });
                        toastEvent.fire();
                        component.set("v.currentStep", 2);
                        
                    }
                     else {
                        let error = response.getError();

                        let toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "title": "Error!",
                            "message": error.getMessage(),
                            "type": "error"
                        });
                        toastEvent.fire();
                    }
                });

                $A.enqueueAction(action);
            } else {
                let toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Null Value!",
                    "message": "Please Enter Name Field!",
                    "type": "error"
                });
                toastEvent.fire();
            }
        } catch (error) {
            console.log('error :: ', error);

        }

    },

    createContactHelp: function (component) {
        try {
            let contactRecord = component.get("v.contactRecord");
            let accId = component.get("v.accId");
            console.log("CR :: ", contactRecord);

            if (contactRecord.LastName != null) {
                let action = component.get("c.createContactRecord");
                action.setParams({ contact: contactRecord, accId: accId });
                console.log("hello");
                action.setCallback(this, function (response) {
                    console.log("callBack");

                    let state = response.getState();
                    console.log("State :: ", state);
                    let createdContact = response.getReturnValue();
                    console.log("Contact ID :: ", createdContact.Id);

                    if (state === "SUCCESS") {
                        component.set("v.contactId", createdContact.Id);
                        let toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "title": "Success!",
                            "message": "Contact created successfully",
                            "type": "success"
                        });
                        toastEvent.fire();
                        component.set("v.currentStep", 3);
                    } else {
                        let error = response.getError();

                        let toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "title": "Error!",
                            "message": error.getMessage(),
                            "type": "error"
                        });
                        toastEvent.fire();
                    }
                });
                $A.enqueueAction(action);
            } else {
                let toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Null Value!",
                    "message": "Please Enter Name Field!",
                    "type": "error"
                });
                toastEvent.fire();
            }

        } catch (err) {
            console.log("Error :: ", err);

        }

    },
    createEventHelp: function (component) {
        let eventRecords = component.get("v.eventRecord");
        let contactId = component.get("v.contactId");

        if(eventRecords.StartDateTime != null && eventRecords.EndDateTime != null){
            if(eventRecords.StartDateTime < eventRecords.EndDateTime){
                console.log("wwe");
            let action = component.get("c.createEventRecord");
            action.setParams({ ev: eventRecords, contactId: contactId });

            action.setCallback(this, function (response) {
                console.log("callBack");

                let state = response.getState();
                console.log("State :: ", state);
                let createdEvent = response.getReturnValue();
                console.log("Event ID :: ", createdEvent.Id);

                if (state === "SUCCESS") {
                    let toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Success!",
                        "message": "Evrent created successfully",
                        "type": "success"
                    });
                    toastEvent.fire();

                    // setting all values to default
                    component.set("v.currentStep", 1);
                    component.set("v.accountRecord", { 'sobjectType': 'Account' });
                    component.set("v.contactRecord", { 'sobjectType': 'Contact' });
                    component.set("v.eventRecord", { 'sobjectType': 'Event' });

                } else {
                    let error = response.getError();

                    let toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Error!",
                        "message": error.getMessage(),
                        "type": "error"
                    });
                    toastEvent.fire();
                }
            });
            $A.enqueueAction(action);
            }
            else{
                let toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Value Error!",
                "message": "Start date can't be greated than End date!",
                "type": "error"
            });
            toastEvent.fire();
            }
            
        }
        else {
            let toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Null Value!",
                "message": "Please Enter Name Field!",
                "type": "error"
            });
            toastEvent.fire();
        }
    }
})