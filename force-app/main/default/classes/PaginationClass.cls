public with sharing class PaginationClass {
    static Integer PageSize = 10;
    static Integer StartCount = 0;
    static Integer size = [SELECT COUNT() FROM Contact];
    static Integer pageNumber = 1;

    @AuraEnabled(cacheable='true')
    public static List<Contact> getContacts(){
        List<Contact> contacts = [SELECT Id, Name FROM Contact ORDER BY Name LIMIT :PageSize OFFSET :StartCount];
        return contacts;
    }
}