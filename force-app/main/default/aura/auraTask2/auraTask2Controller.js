({
    doInit: function (component, event, helper) {
        helper.getAccounts(component);
    },

    handleChange: function (component, event, helper) {
        var selectedAccountId = event.getSource().get("v.value");
        // component.set("v.currentPage", 1);
        component.set("v.selectedAccountId", selectedAccountId);
        helper.getContacts(component, selectedAccountId, 1);
    },

    previousPage: function (component, event, helper) {
        var accountId = component.get("v.selectedAccountId");
        var currentPage = component.get("v.currentPage");
        if (currentPage > 1) {
            component.set("v.currentPage", currentPage - 1);
            helper.getContacts(component, accountId, currentPage - 1);
        }
    },

    nextPage: function (component, event, helper) {
        var accountId = component.get("v.selectedAccountId");
        var currentPage = component.get("v.currentPage");
        var totalPages = component.get("v.totalPages");

        if (currentPage < totalPages) {
            component.set("v.currentPage", currentPage + 1);
            helper.getContacts(component, accountId, currentPage + 1);
        }
    }
});
