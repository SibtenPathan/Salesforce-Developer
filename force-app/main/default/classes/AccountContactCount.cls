public with sharing class AccountContactCount {
    public AccountContactCount() {
        
    }
    
    public static Integer getContactCount(Id accountId){
        try{
            if(accountId == null){
                return 0;
            }
            
            return [SELECT COUNT() FROM Contact WHERE AccountId = :accountId];
        } catch(Exception e) {
            Error_Log.insertErrorLog(e, 'AccountContactCount', 'getContactCount');
            return 0;
        }
    }
}