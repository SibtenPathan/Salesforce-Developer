@isTest
public with sharing class GreatTriggerTest {
    @isTest
    public static void testGreatTrigger(){
        Account acc = new Account(Name = 'Trigger Test', Max_Amount_GreatTrigger__c = 30);
        insert acc;

        Contact ct1 = new Contact(LastName = 'Contact1', AccountId = acc.Id,Amount_GreatTrigger__c = 30);
        Contact ct2 = new Contact(LastName = 'Contact2', AccountId = acc.Id, Amount_GreatTrigger__c = 10);
        insert new List<Contact>{ct1, ct2};

        Contact ct3 = new Contact(LastName = 'Contact3', AccountId = acc.Id,Amount_GreatTrigger__c = 45);
        Contact ct4 = new Contact(LastName = 'Contact4', AccountId = acc.Id,Amount_GreatTrigger__c = 25);
        insert new List<Contact>{ct3, ct4};
    }
}