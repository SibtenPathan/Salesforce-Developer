trigger sheep on Contact (after update) {
    if(sheep.isFirstTime){
        sheep.isFirstTime = false;
        sheep.updateAccounts(trigger.new, trigger.oldMap);
    }
}