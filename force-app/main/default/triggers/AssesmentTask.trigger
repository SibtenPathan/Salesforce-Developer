trigger AssesmentTask on Account (before insert, before update) {
    if (trigger.isInsert) {
        List<Account> newAccounts = trigger.new;
        List<String> accountNames = new List<String>();
        for(Account acc : newAccounts) {
            accountNames.add(acc.Name);
        }
        List<Account> existingAccounts = [SELECT Name FROM Account WHERE Name IN :accountNames];
        if(!existingAccounts.isEmpty()){
            System.debug('Account Name Already exists');
            for(Account acc: newAccounts){
                for(Account existingAcc: existingAccounts){
                    if(acc.Name == existingAcc.Name){
                        acc.Name.addError('Account Name Already exists');
                    }
                }
            }
        } 
    } else {
        // for(Account acc: trigger.new){
        //     List<User> adminList = [SELECT Id FROM User WHERE Profile.Name = 'System Administrator'];
        //     // if(System.UserInfo.getUserId() != '005dL00000CNWQ6QAP'){d
        //     //     acc.addError('Only System Admin can edit Accounts');
        //     // }
            
            
        // }
        for(Account acc: trigger.new){
            List<User> adminList = [SELECT Id FROM User WHERE Profile.Name = 'System Administrator'];
            Boolean isAdmin = false;
            for(User admin : adminList) {
                if(admin.Id == System.UserInfo.getUserId()) {
                    isAdmin = true;
                    break;
                }
            }
            if(!isAdmin) {
                acc.addError('Only System Admin can edit Accounts');
            }
        }
    }
}
