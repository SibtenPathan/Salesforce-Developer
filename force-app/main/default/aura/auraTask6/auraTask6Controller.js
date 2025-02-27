({
    next : function(component, event, helper) {
        var step = component.get("v.step");
        if(step < 5){
            step++;
            component.set("v.step", step);
        }
    },
    prev : function(component, event, helper) {
        var step = component.get("v.step");
        if(step > 1){
            step--;
            component.set("v.step", step);
        }
    }
})