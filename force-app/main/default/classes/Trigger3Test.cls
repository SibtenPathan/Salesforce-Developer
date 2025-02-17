@isTest
public with sharing class Trigger3Test {
    @isTest
    public static void testTrigger3(){
        Opportunity opp = new Opportunity(Name = 'Test Opportunity', StageName = 'Qualification', CloseDate = Date.today()+5, Amount = 1000);
        opp.Discount_Percent__c = 25;
        opp.Amount_Approved__c = 'Yes';
        insert opp;

        opp.StageName = 'Prospecting';
        opp.CloseDate = Date.today()+15;
        update opp;

        Opportunity updatedOpp = [SELECT StageName, CloseDate FROM Opportunity WHERE Id = :opp.Id];

        System.assertEquals('Prospecting', updatedOpp.StageName, 'Stage name should be Prospecting');
        System.assertEquals(Date.today()+15, updatedOpp.CloseDate, 'Date should be after 15 days');
    }
}