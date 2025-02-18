@isTest
public with sharing class Trigger12Test {
    @isTest
    public static void testTrigger12(){
        Account acc1 = new Account(Name = 'triggerTest 1');
        Account acc2 = new Account(Name = 'triggerTest 2');
        insert new List<Account>{acc1, acc2};

        Account acc3 = new Account(Name = 'triggerTest 1');
        Account acc4 = new Account(Name = 'triggerTest 2');
        insert new List<Account>{acc3, acc4};
    }
}