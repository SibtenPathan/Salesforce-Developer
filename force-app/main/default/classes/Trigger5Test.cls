@isTest
public with sharing class Trigger5Test {
    @isTest
    public static void testTrigger5(){
        Account acc = new Account(Name = 'Trigger Test Test');
        insert acc;

        Account updateAcc = [SELECT Name FROM Account WHERE Id = :acc.Id];
        updateAcc.Name = 'Test Trigger Test';
        update updateAcc;

        Account updatedAcc = [SELECT Name FROM Account WHERE Id = :acc.Id];
        System.assertEquals('Test Trigger Test', updatedAcc.Name, 'Error');
    }
}