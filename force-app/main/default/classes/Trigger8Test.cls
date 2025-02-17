@isTest
public with sharing class Trigger8Test {
    @isTest
    public static void testTrigger8(){
        Contact ct = new Contact();
        ct.LastName = 'Test';
        insert ct;

        delete ct;
    }
}