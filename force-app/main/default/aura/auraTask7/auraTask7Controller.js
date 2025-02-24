({
    doInit: function (component, event, helper) {
        helper.getAccounts(component);
    },
    handleChange: function(component, event, helper){
        helper.handleChange(component, event);
    }
})