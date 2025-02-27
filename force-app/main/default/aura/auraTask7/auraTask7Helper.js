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
    setColumns: function(component){
        component.set("v.contactColumns", [
            { label: 'Name', fieldName: 'Name', type: 'text' },
            { label: 'Email', fieldName: 'Email', type: 'email' },
            { label: 'Phone', fieldName: 'Phone', type: 'Phone' }
        ]);
        component.set("v.opportunityColumns", [
         { label: 'OpportunityName', fieldName: 'Name', type: 'text' },
         { label: 'Amount', fieldName: 'Amount', type: 'Amount' },
         { label: 'Close Date', fieldName: 'CloseDate', type: 'Date' }
     ]);
    },

    handleChange: function(component, event){
        var selectedAccountId = event.getSource().get("v.value");
        console.log(selectedAccountId);
        component.set("v.selectedAccountId", selectedAccountId);
    },

    handleClick: function(component){
        var action = component.get("c.getData");

        var accountId = component.get("v.selectedAccountId");

        action.setParams({ id: accountId});
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
               var response = response.getReturnValue();
               console.log("Contacts: ",response.contacts);
               component.set("v.contacts", response.contacts);
               component.set("v.opportunities", response.Opportunities);
            }
        });
        $A.enqueueAction(action);
    }
})