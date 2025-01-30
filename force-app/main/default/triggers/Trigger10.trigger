trigger Trigger10 on Account (after insert) {
    for(Account acc : trigger.new){
        Contact ct = new Contact();
        ct.LastName = acc.Name;
        ct.AccountId = acc.Id;
        insert ct;
    }
}