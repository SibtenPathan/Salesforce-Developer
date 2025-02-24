({
    createAccount : function(component, event, helper) {
            console.log('createAccount');
            helper.createAccountHelp(component);
    },
    createContact : function(component, event, helper){
        console.log('createContact');
        helper.createContactHelp(component);
    },
    createEvent : function(component, event, helper){
        console.log('createEvent');
        helper.createEventHelp(component);
    },
    previous : function(component, event, helper){
        console.log('Previous');
        let value = component.get("v.currentStep");
        if(value > 1)
            component.set("v.currentStep", value-1);
    }
})