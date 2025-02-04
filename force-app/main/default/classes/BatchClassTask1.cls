public class BatchClassTask1 implements Database.Batchable<sObject> {

    public final String query;
    public BatchClassTask1() {
        query = 'SELECT Id, Name, (SELECT Id, Name FROM Opportunities) FROM Account';  
    }

    public Database.QueryLocator start (Database.BatchableContext bc){
        return Database.getQueryLocator(query);
        // query = SELECT Id, Name, (SELECT Id, Name FROM Opportunities) FROM Account
    }

    public void execute(Database.BatchableContext bc, List<Account> scope){
        System.debug(scope.size());
        List<Account> accountsToUpdate = new List<Account>();
        for(Account acc : scope){
            String des = '';
            for(Opportunity opp : acc.Opportunities){
                des += opp.Name+', ';
            }
            acc.Description = des.trim();
            accountsToUpdate.add(acc);
            System.debug(des);
        }

        System.debug('Hello');
        System.debug(accountsToUpdate.size());
        if(!accountsToUpdate.isEmpty()){
            update accountsToUpdate;
        }
    }

    public void finish(Database.BatchableContext bc){

    }
}