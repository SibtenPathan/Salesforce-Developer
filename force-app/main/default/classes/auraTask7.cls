public with sharing class auraTask7 {

    public class wrapper{
        @AuraEnabled public List<Contact> contacts;
        @AuraEnabled public List<Opportunities> Opportunities;
    }

    @AuraEnabled
    public static List<Account> getAccounts() {
        return [SELECT Id, Name FROM Account];
    }

    @AuraEnabled
    public static wrapper getData(Id id){
        try {
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}