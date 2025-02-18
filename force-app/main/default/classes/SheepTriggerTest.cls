@isTest
public with sharing class SheepTriggerTest {
    @isTest
    public static void testSheepTrigger(){
        Account acc1 = new Account(Name = 'Trigger Test1');
        Account acc2 = new Account(Name = 'Trigger Test2');
        insert new List<Account>{acc1, acc2};

        Contact ct1 = new Contact(LastName = 'Contact1', AccountId = acc1.Id, Amount__c = 1000);
        Contact ct2 = new Contact(LastName = 'Contact2', AccountId = acc1.Id, Amount__c = 2000);
        Contact ct3 = new Contact(LastName = 'Contact3', AccountId = acc1.Id, Amount__c = 3000);
        insert new List<Contact>{ct1, ct2, ct3};

        ct2.AccountId = acc2.Id;
        update ct2;
    }
}