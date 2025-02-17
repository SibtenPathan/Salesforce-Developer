@isTest
public with sharing class Trigger7Test {
    @isTest
    public static void testTrigger7(){
        Account acc = new Account(Name = 'Test');
        insert acc;
    }
}