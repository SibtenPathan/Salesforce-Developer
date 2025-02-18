@isTest
public with sharing class Trigger11Test {
    @isTest
    public static void testTrigger11(){
        Contact ct = new Contact(LastName = 'Test');
        insert ct;
    }
}