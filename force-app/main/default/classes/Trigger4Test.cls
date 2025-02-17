@isTest
public with sharing class Trigger4Test {
    @isTest
    public static void testTrigger4(){
        Opportunity opp = new Opportunity();
        opp.Name = 'Test Opp';
        opp.StageName = 'Prospecting';
        opp.CloseDate = Date.today()+20;
        opp.Amount = 10000;
        opp.Discount_Percent__c = 25;
        opp.Amount_Approved__c = 'Yes';

        insert opp;

        Opportunity updatedOpp = [SELECT Type FROM Opportunity WHERE Id = :opp.Id];
        updatedOpp.Type = 'New Customer';
        update updatedOpp;

        Opportunity finalOpp = [SELECT Type FROM Opportunity WHERE Id = :opp.Id];

        System.assertEquals('New Customer', finalOpp.Type, 'Opportunity Type should be New Customer');

    }
    
}