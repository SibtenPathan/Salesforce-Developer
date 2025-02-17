@isTest
public with sharing class Trigger2Test {
    @isTest
    public static void testTrigger2(){
        Lead lead = new Lead();
        lead.LastName = 'teiggerTest';
        lead.Company = 'commmm';
        lead.Status = 'Open - Not Contacted';
        
        insert lead;
        
        Lead insertedLead = [SELECT Id, Rating FROM Lead WHERE Id = :lead.Id];
        
        System.assertEquals('Hot', insertedLead.Rating, 'The Rating should be updated to Hot');
    }
}