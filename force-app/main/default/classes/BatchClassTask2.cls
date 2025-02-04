public class BatchClassTask2 implements Database.Batchable<sObject>{

    public final String query;
    public BatchClassTask2() {
        query = 'SELECT Id, Description FROM Account';
    }
    DateTime currentTimestamp = DateTime.now(); 

    public Database.QueryLocator start (Database.BatchableContext bc){
        return Database.getQueryLocator(query);
    }

    public void execute(Database.BatchableContext bc, List<Account> scope){
        List<Account> accList = new List<Account>();
        for(Account acc : scope){
            acc.Description = currentTimestamp.toString();
            accList.add(acc);
        }

        update accList;
    }

    public void finish(Database.BatchableContext bc){

    }

}