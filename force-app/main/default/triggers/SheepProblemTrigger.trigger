trigger SheepProblemTrigger on Contact (after update) {
    if(SheepClass.isFirstTime){
        SheepClass.isFirstTime = false;
        Set<Id> accountIds = new Set<Id>();
        for(Contact ct : trigger.new){
            if(ct.AccountId != null){
                accountIds.add(ct.AccountId);
            }
        }

        if(accountIds != null){
            List<Contact> contacts = [SELECT Id, AccountId FROM Contact WHERE AccountId IN :accountIds];
            List<Account> accounts = [SELECT id, Name FROM Account WHERE Id IN :accountIds];
            for(Contact ct : contacts){ 
                for(Account acc : accounts){
                    if(ct.AccountId == acc.Id){
                        ct.LastName = acc.Name;
                    }
                }
            }
            update contacts;
        }
    }
}
