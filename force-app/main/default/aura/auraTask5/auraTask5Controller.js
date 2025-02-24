({
    handleClick : function(component, event, helper) {
        var url = component.get("v.description");
        console.log('Link : ',url);
        component.set("{!v.Step}", 1);
    }
})