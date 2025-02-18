public class WorkbenchTask2 implements Database.Batchable<sObject> {

    public Database.QueryLocator start(Database.BatchableContext bc) {
        System.debug('Starting batch execution...');
        return Database.getQueryLocator('SELECT Id FROM Account LIMIT 1');
    }

    public void execute(Database.BatchableContext bc, List<sObject> scope) {
        System.debug('reached execute');
        List<Account> newAccounts = new List<Account>();
    
        for (Integer i = 0; i < 2000; i++) {
            Account newAccount = new Account(Name = 'Workbench_Account'+i );
            newAccounts.add(newAccount);
        }
        System.debug('Account list created');

        if (!newAccounts.isEmpty()) {
            try {
                insert newAccounts;
                System.debug('Successfully inserted 2000 demo accounts.'+ newAccounts.size());
            } catch (DmlException e) {
                System.debug('Error inserting demo accounts: ' + e.getMessage());
            }
        }
    }

    public void finish(Database.BatchableContext bc) {
        System.debug('All 2000 demo accounts have been created successfully.');
    }
}
// SELECT Status, CompletedDate FROM AsyncApexJob WHERE Id = :batchId