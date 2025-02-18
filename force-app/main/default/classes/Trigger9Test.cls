@isTest
public with sharing class Trigger9Test {
    @isTest
    public static void testTrigger9(){
        Account acc = new Account(Name = 'Test');
        insert acc;
    }
}