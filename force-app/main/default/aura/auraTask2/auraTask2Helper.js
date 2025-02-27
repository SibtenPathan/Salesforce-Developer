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

    getContacts: function (component, accountId, pageNumber) {
        var pageSize = component.get("v.pageSize");
        var action = component.get("c.getContactsForAccountPaginated");
        action.setParams({
            accountId: accountId,
            pageNumber: pageNumber,
            pageSize: pageSize
        });

        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                component.set("v.data", result.contacts);
                component.set("v.totalRecords", result.totalRecords);
                component.set("v.currentPage", result.currentPage);
                component.set("v.totalPages", Math.ceil(result.totalRecords / pageSize));

                var columns = [
                    { label: "Name", fieldName: "Name", type: "text" },
                    { label: "Email", fieldName: "Email", type: "email" },
                    { label: "Phone", fieldName: "Phone", type: "phone" }
                ];
                component.set("v.columns", columns);
            }
        });
        $A.enqueueAction(action);
    }
});
