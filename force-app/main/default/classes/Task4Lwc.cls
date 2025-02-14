public with sharing class Task4Lwc {
    @AuraEnabled
    public static List<Account> getOptions(){
        return [SELECT Id, Name FROM Account];
    }

    @AuraEnabled
    public static List<Contact> getContacts(Id acc_Id){
        try {
            List<Contact> contacts =  [SELECT Id, FirstName, LastName, Email FROM Contact WHERE AccountId = :acc_Id];
            System.debug(contacts);
            return contacts;
        } catch (Exception e) {
            throw new AuraHandledException('Error retriving Contacts: '+e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Opportunity> getOpportunities(Id acc_Id){
        try {
            return [SELECT Id, Name, CloseDate, Amount FROM Opportunity WHERE AccountId = :acc_Id];
        } catch (Exception e) {
            throw new AuraHandledException('Error Retriving Opportunities'+e.getMessage());
        }
    }
    
}