@isTest
public with sharing class Trigger10Test {
    @isTest
    public static void testTrigger10(){
        Account acc = new Account(Name = 'Test');
        insert acc;
        Contact ct = new Contact(LastName = acc.Name, AccountId = acc.Id);
    }
}