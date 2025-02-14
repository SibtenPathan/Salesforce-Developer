public with sharing class Task1LWC {
    @AuraEnabled
    public static boolean createContact(Contact contactDetails){
        try {
            if (contactDetails != null) {
                insert contactDetails;
            }
            return true;
        } catch (Exception e) {
            System.debug('Error occured: '+e);
            return false;
        }
    }
}