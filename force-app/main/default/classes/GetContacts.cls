public with sharing class GetContacts {
    @AuraEnabled(cacheable='true')
    public static List<Contact> getContactsList(){
        return [SELECT Id, Name FROM Contact LIMIT 20]; 
    }
}