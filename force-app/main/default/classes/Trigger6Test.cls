@isTest
public with sharing class Trigger6Test {
    @isTest
    public static void testTrigger6(){
        Opportunity opp = new Opportunity();
        opp.Name = 'Test Opp';
        opp.StageName = 'Prospecting';
        opp.CloseDate = Date.today()+20;
        opp.Amount = 10000;
        opp.Discount_Percent__c = 25;
        opp.Amount_Approved__c = 'Yes';

        insert opp;

        Opportunity oppUpdate = [SELECT Name FROM Opportunity WHERE Id = :opp.Id];
        oppUpdate.Name = 'Testing';

        update oppUpdate;
    }
}