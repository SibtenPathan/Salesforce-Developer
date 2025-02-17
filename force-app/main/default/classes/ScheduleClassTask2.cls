public with sharing class ScheduleClassTask2 implements Schedulable{
    
    public void execute(SchedulableContext ctx){
        try {
            List<Account> accounts= [SELECT Id, Rating FROM Account];
            for(Account acc : accounts){
                acc.Rating = 'Warm';
            }

            update accounts;
        } catch (QueryException e) {
            System.debug('Error: '+e.getMessage());
        }
    }
}