({
    getAccounts : function(component) {
        var action = component.get("c.getAccounts");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var formatedAccounts = response.getReturnValue().map(function(account) {
                    return {
                        label: account.Name,
                        value: account.Id
                    };
                }
                );
                component.set("v.accounts", formatedAccounts);
            }
        });
        $A.enqueueAction(action);
    },
    getContacts : function(component, accountId) {
        var action = component.get("c.getContactsForAccount");
        action.setParams({
            accountId: accountId
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.data", response.getReturnValue());
                var columns = [{label: 'Name', fieldName: 'Name', type: 'text'}, {label: 'Email', fieldName: 'Email', type: 'email'}, {label: 'Phone', fieldName: 'Phone', type: 'phone'}];
                component.set("v.columns", columns);
            }
        });
        $A.enqueueAction(action);
    }
})