public with sharing class auraTask2 {
    @AuraEnabled
    public static List<Contact> getContacts() {
        System.debug('getContacts()');
        List<Contact> contacts = [SELECT Id, Name FROM Contact LIMIT 10];
        return contacts;
    }

    @AuraEnabled
    public static List<Account> getAccounts() {
        System.debug('getAccounts()');
        List<Account> accounts = [SELECT Id, Name FROM Account];
        return accounts;
    }

    @AuraEnabled
    public static List<Contact> getContactsForAccount(Id accountId) {
        System.debug('getContactsForAccount()');
        List<Contact> contacts = [SELECT Id, Name, Phone, Email FROM Contact WHERE AccountId = :accountId];
        return contacts;
    }
}