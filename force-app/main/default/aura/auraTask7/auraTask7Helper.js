({
    getAccounts: function (component) {
        var action = component.get("c.getAccounts");
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var formattedAccounts = response.getReturnValue().map(function (account) {
                    return {
                        label: account.Name,
                        value: account.Id
                    };
                });
                component.set("v.accounts", formattedAccounts);
            }
        });
        $A.enqueueAction(action);
    },

    handleChange: function(component, event){
        var selectedAccountId = event.getSource().get("v.value");
        console.log(selectedAccountId);
        
        // component.set("v.selectedAccountId", )
    }
})