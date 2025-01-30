trigger Trigger8 on Contact (after Delete) {
    Set<String> accounts = new Set<String>();
    for(Contact c : trigger.old){
        accounts.add(c.AccountId);
    }

    if (!accounts.isEmpty()) {
        Delete [select Id from Account where Id in :accounts];
    }
}   