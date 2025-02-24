public with sharing class AuraTask4 {

    @AuraEnabled
    public static Account createAccountRecord(Account account) {
        insert account;
        return account;
    }

    @AuraEnabled
    public static Contact createContactRecord(Contact contact, Id accId){
        try {
            contact.AccountId = accId;
            insert contact;
            return contact;
        } catch (Exception e) {
            System.debug('error :: '+e);
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Event createEventRecord(Event ev, Id contactId){
        try {
            ev.WhoId = contactId;
            ev.subject = 'Wizard Task';
            insert ev;
            return ev;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

}