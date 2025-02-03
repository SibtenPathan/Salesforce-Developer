public with sharing class sheep {
    public static boolean isFirstTime = true;
    
    public static void updateAccounts(List<Contact> newContacts, Map<Id, Contact> oldContacts){
        Map<Id, Id> OldToNewAccountMap = new Map<Id, Id>();

    for(Contact ct : newContacts){
        Contact oldCt = oldContacts.get(ct.Id);
        if(oldCt.AccountId != null && ct.AccountId != oldCt.AccountId){
            OldToNewAccountMap.put(oldCt.AccountId, ct.AccountId);
        }
    }

    if(!OldToNewAccountMap.isEmpty()){
        List<Contact> contactsToUpdate = [SELECT Id, AccountId FROM Contact WHERE AccountId IN :OldToNewAccountMap.keySet()];
        for(Contact ct : contactsToUpdate){
            ct.AccountId = OldToNewAccountMap.get(ct.AccountId); 
        }
    
        update contactsToUpdate;
    }
    }
}