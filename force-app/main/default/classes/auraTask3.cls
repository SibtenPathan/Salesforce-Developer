public with sharing class auraTask3 {
    
    @AuraEnabled
    public static List<Account> getAccounts(String search){
        try {
            return [SELECT Id, Name FROM Account WHERE Name LIKE :('%' + search + '%')];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Contact> getRelatedContacts(Id accountId){
        try {
            System.debug('contacta');
            System.debug(accountId);
            // System.debug([SELECT Id, Name FROM Contact WHERE AccountId = :accountId]);
            return [SELECT Id, Name FROM Contact WHERE AccountId = :accountId];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static boolean changeParent(Id contactId, Id accountId1, Id accountId2){
        try {
            Contact ct = [SELECT Id, AccountId FROM Contact WHERE Id = :contactId];
            if(ct.AccountId != accountId1){
                ct.AccountId = accountId1;
                System.debug('Updated1');
            } else {
                ct.AccountId = accountId2;
                System.debug('Updated2');
            }
            update ct;
            return true;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}