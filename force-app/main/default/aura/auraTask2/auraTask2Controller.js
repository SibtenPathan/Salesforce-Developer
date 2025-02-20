({
    doInit : function(component, event, helper) {
        helper.getAccounts(component);
    },
    handleChange : function(component, event, helper) {
        var selectedAccountId = event.getSource().get("v.value");
        console.log("Selected Account Id: " + selectedAccountId);
        helper.getContacts(component, selectedAccountId);
    }
})