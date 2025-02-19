public with sharing class auraTask1 {
    @AuraEnabled
    public static Contact createContactRecord(Contact contact) {
        try {
            insert contact;
            return contact;
        } catch (Exception e) {
            throw new AuraHandledException('Error creating contact: ' + e.getMessage());
        }
    }
}
