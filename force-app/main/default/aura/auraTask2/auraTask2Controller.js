({
    getOptions: function (component, event, helper) {
        console.log('getOptions called');

        var action = component.get("c.getAccounts");
        action.setCallback(this, function (response) {
            var state = response.getState();
            console.log('state : ', state);

            if (state === "SUCCESS") {
                var accounts = response.getReturnValue();
                var formattedAccounts = accounts.map(function (account) {
                    return {
                        label: account.Name,
                        value: account.Id
                    };
                });
                component.set("v.options", formattedAccounts);
            } else {
                console.error("Error fetching accounts: " + response.getError());
            }
        });
        $A.enqueueAction(action);
    }, handleChange: function (component, event, helper) {
        console.log('handleChange called');
        var selectedAccountId = event.getSource().get("v.value")
        console.log('selectedAccountId : ', selectedAccountId);

        var action = component.get("c.getContactsForAccount");
        action.setParams({
            accountId: selectedAccountId
        });
        action.setCallback(this, function (response) {
            var state = response.getState();
            console.log('state : ', state);

            if (state === "SUCCESS") {
                component.set("v.data", response.getReturnValue());
                component.set("v.columns", [{ label: 'Name', fieldName: 'Name', type: 'text' }, { label: 'Email', fieldName: 'Email', type: 'email' }, { label: 'Phone', fieldName: 'Phone', type: 'phone' }]);
            } else {
                console.error("Error fetching contacts: " + response.getError());
            }
        });
        $A.enqueueAction(action);
    }
}
)
