trigger Trigger13 on Account (after update) {
    List<AccountShare> accounts = new List<AccountShare>();
    Id wilsonUserId = '005dL00000DIO7d';
    for(Account acc : trigger.new){
        if(acc.Rating =='Hot'){
            AccountShare newShare = new AccountShare();
            newShare.AccountId = acc.Id;
            newShare.UserOrGroupId = wilsonUserId; 
            newShare.AccountAccessLevel = 'Read'; 
            newShare.OpportunityAccessLevel = 'Read';
            newShare.CaseAccessLevel = 'Read';

            accounts.add(newShare);
        }
    }
    insert accounts;
}