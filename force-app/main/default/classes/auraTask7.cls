public with sharing class auraTask7 {

    public class wrapper{
        @AuraEnabled public List<Contact> contacts;
        @AuraEnabled public List<Opportunity> Opportunities;
    }

    @AuraEnabled
    public static List<Account> getAccounts() {
        return [SELECT Id, Name FROM Account];
    }

    @AuraEnabled
    public static wrapper getData(Id id){
        try {
            System.debug('Id: '+id);
            List<Contact> getContacts = [SELECT Id, Name, Email, Phone FROM Contact WHERE AccountId = :id];
            List<Opportunity> getOpportunities = [SELECT Id, Name, Amount, CloseDate FROM Opportunity WHERE AccountId = :id];
            wrapper wrp = new wrapper();
            wrp.contacts = new List<Contact>(getContacts);
            wrp.Opportunities = new List<Opportunity>(getOpportunities);
            return wrp;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}