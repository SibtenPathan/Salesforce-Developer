public with sharing class auraTask2 {
    @AuraEnabled
    public static List<Account> getAccounts() {
        return [SELECT Id, Name FROM Account];
    }

    @AuraEnabled
    public static List<Contact> getContactsForAccount(Id accountId) {
        return [SELECT Id, Name, Phone, Email FROM Contact WHERE AccountId = :accountId];
    }

    @AuraEnabled
    public static Map<String, Object> getContactsForAccountPaginated(Id accountId, Integer pageNumber, Integer pageSize) {
        Integer offsetValue = (pageNumber - 1) * pageSize;
        List<Contact> contacts = [SELECT Id, Name, Phone, Email FROM Contact WHERE AccountId = :accountId LIMIT :pageSize OFFSET :offsetValue];

        Integer totalRecords = [SELECT COUNT() FROM Contact WHERE AccountId = :accountId];

        Map<String, Object> result = new Map<String, Object>();
        result.put('contacts', contacts);
        result.put('totalRecords', totalRecords);
        result.put('currentPage', pageNumber);

        return result;
    }
}
