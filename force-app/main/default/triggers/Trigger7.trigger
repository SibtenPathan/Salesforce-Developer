trigger Trigger7 on Account (after insert) {
    List<Account> accounts = [select Name from Account where Id In :trigger.new];
    for(Account acc : accounts){
        acc.Name = 'Mr. '+acc.Name;
    }
    Update accounts;
}