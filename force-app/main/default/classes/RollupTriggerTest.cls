@isTest
public with sharing class RollupTriggerTest {
    @isTest
    public static void testRollUp(){
        Account acc = new Account(Name = 'Trigger Test');
        insert acc;

        Contact ct1 = new Contact(LastName = 'Contact1', AccountId = acc.Id, Amount__c = 1000);
        Contact ct2 = new Contact(LastName = 'Contact2', AccountId = acc.Id, Amount__c = 2000);
        Contact ct3 = new Contact(LastName = 'Contact3', AccountId = acc.Id, Amount__c = 3000);
        insert new List<Contact>{ct1, ct2, ct3};

        delete ct3;
    }
}