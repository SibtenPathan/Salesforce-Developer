@isTest
public with sharing class Trigger13Test {
    @isTest
    public static void testTrigger13(){
        Account acc = new Account(Name = 'Trigger Test', Rating = 'Warm');
        insert acc; 

        acc.Rating = 'Hot';
        update acc;
    }
}