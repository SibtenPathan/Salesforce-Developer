({
    handleKeyUp1: function (component) {
        return new Promise((resolve, reject) => {
            component.set("v.isLoading", true);  // Start loading before the request
            var queryTerm1 = component.find('enter-search-1').get('v.value');
            console.log("queryTerm1", queryTerm1);

            var action1 = component.get("c.getAccounts");
            action1.setParams({ search: queryTerm1 });

            action1.setCallback(this, function (response) {
                var state = response.getState();
                component.set("v.isLoading", false); // Stop loading when the request finishes
                if (state === 'SUCCESS') {
                    var Accounts = response.getReturnValue();
                    component.set("v.accounts1", Accounts);
                    console.log("Account 1: ", component.get("v.accounts1"));
                    resolve(); // Resolve promise once the action is complete
                } else {
                    reject(response.getError()); // Reject if there's an error
                }
            });

            $A.enqueueAction(action1); // Enqueue the action for server-side processing
        });
    },

    getAccounts1: function (component) {
        var options = component.get("v.accounts1").map(account => {
            return { label: account.Name, value: account.Id };
        });
        component.set("v.options1", options);
    },

    setAccount1: function (component, event) {
        return new Promise((resolve, reject) => {
            try {
                var selectedValue = event.getParam("value");
                console.log("Selected Picklist Value:", selectedValue);
                component.set("v.account1", selectedValue);
                console.log("Account1 Id", component.get("v.account1"));
                resolve(); // Resolve the promise when account is set successfully
            } catch (error) {
                console.error("Error in setAccount1:", error);
                reject(error); // Reject if there's an error
            }
        });
    },

    handleKeyUp2: function (component) {
        return new Promise((resolve, reject) => {
            component.set("v.isLoading", true);  // Start loading before the request
            var queryTerm2 = component.find('enter-search-2').get('v.value');
            console.log("queryTerm2", queryTerm2);

            var action2 = component.get("c.getAccounts");
            action2.setParams({ search: queryTerm2 });

            action2.setCallback(this, function (response) {
                var state = response.getState();
                component.set("v.isLoading", false); // Stop loading when the request finishes
                if (state === 'SUCCESS') {
                    var Accounts = response.getReturnValue();
                    component.set("v.accounts2", Accounts);
                    console.log("Account 2: ", component.get("v.accounts2"));
                    resolve(); // Resolve promise once the action is complete
                } else {
                    reject(response.getError()); // Reject if there's an error
                }
            });

            $A.enqueueAction(action2); // Enqueue the action for server-side processing
        });
    },

    getAccounts2: function (component) {
        var options = component.get("v.accounts2").map(account => {
            return { label: account.Name, value: account.Id };
        });
        component.set("v.options2", options);
    },

    setAccount2: function (component, event) {
        return new Promise((resolve, reject) => {
            try {
                var selectedValue = event.getParam("value");
                console.log("Selected Picklist Value:", selectedValue);
                component.set("v.account2", selectedValue);
                console.log("Account2 Id", component.get("v.account2"));
                resolve(); // Resolve the promise when account is set successfully
            } catch (error) {
                console.error("Error in setAccount2:", error);
                reject(error); // Reject if there's an error
            }
        });
    },

    getContacts1: function (component) {
        return new Promise((resolve, reject) => {
            var accountId = component.get("v.account1");
            console.log('accountId: ', accountId);

            var action = component.get("c.getRelatedContacts");
            action.setParams({ accountId: accountId });

            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var contacts = response.getReturnValue();
                    console.log("Contacts1: ", contacts);
                    component.set("v.contact1", contacts);
                    resolve(); // Resolve when the contacts are fetched successfully
                } else {
                    reject(response.getError()); // Reject if there's an error
                }
            });

            $A.enqueueAction(action);
        });
    },

    getContacts2: function (component) {
        return new Promise((resolve, reject) => {
            var accountId = component.get("v.account2");
            console.log('accountId: ', accountId);

            var action = component.get("c.getRelatedContacts");
            action.setParams({ accountId: accountId });

            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var contacts = response.getReturnValue();
                    console.log("Contacts2: ", contacts);
                    component.set("v.contact2", contacts);
                    resolve(); // Resolve when the contacts are fetched successfully
                } else {
                    reject(response.getError()); // Reject if there's an error
                }
            });

            $A.enqueueAction(action);
        });
    },

    drop: function(component, event){
        event.preventDefault();
        var draggedContactId = component.get("v.draggedContact");
        var targetList = event.currentTarget.dataset.list;
        var acc1 = component.get("v.account1");
        var acc2 = component.get("v.account2");

        if (!draggedContactId) return;

        // Get the contact lists
        var contact1 = component.get("v.contact1");
        var contact2 = component.get("v.contact2");

        // Find the dragged contact in the lists
        var contactToMove = contact1.find(c => c.Id === draggedContactId) || contact2.find(c => c.Id === draggedContactId);
        if (!contactToMove) return;

        // Remove from current list
        contact1 = contact1.filter(c => c.Id !== draggedContactId);
        contact2 = contact2.filter(c => c.Id !== draggedContactId);

        // Add to target list
        if (targetList === "contact1") {
            contact1.push(contactToMove);
        } else {
            contact2.push(contactToMove);
        }

        var action = component.get("c.changeParent");
        action.setParams({ contactId: draggedContactId, accountId1: acc1, accountId2: acc2});
        action.setCallback(this, function(response) {});
        $A.enqueueAction(action);

        // Update component state
        component.set("v.contact1", contact1);
        component.set("v.contact2", contact2);
        component.set("v.draggedContact", null); // Clear dragged contact
    }
})
