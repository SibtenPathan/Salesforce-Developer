public with sharing class PaginationClass {
    static Integer PageSize = 10;
    static Integer StartCount = 0;
    
    @AuraEnabled(cacheable='true')
    public static List<Contact> getContacts(Integer pageNumber, Integer pageSize){
        Integer offset = (pageNumber - 1) * pageSize;
        List<Contact> contacts = [SELECT Id, Name, Email FROM Contact ORDER BY Name LIMIT :pageSize OFFSET :offset];
        return contacts;
    }
}
