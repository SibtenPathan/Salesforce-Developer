({
    doInit: function (component, event, helper) {
        helper.getAccounts(component);
        helper.setColumns(component);
    },
    handleChange: function(component, event, helper){
        helper.handleChange(component, event);
    },
    handleClick: function(component, event, helper){
        console.log("Button Clicked");
        helper.handleClick(component);
    }
})