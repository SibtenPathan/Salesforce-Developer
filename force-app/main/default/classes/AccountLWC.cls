public with sharing class AccountLWC {
    @AuraEnabled
    public static boolean createAccount(Account accountDetails){
        try {
            if (accountDetails != null) {
                insert accountDetails;
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            System.debug('Error occured: '+e);
            return false;
        }
    }

    @AuraEnabled(cacheable='true')
    public static List<Account> getAccounts(Integer pageNumber, Integer pageSize){
        Integer offset = (pageNumber - 1) * pageSize;
        List<Account> accounts = [SELECT Id, Name, AccountNumber, Phone, Site FROM Account ORDER BY Name LIMIT :pageSize OFFSET :offset];
        return accounts;
    }

    @AuraEnabled(cacheable='true')
    public static Integer getTotalRecords(){
        return [SELECT COUNT() FROM Account];
    }
}