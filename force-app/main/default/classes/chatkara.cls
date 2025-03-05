public with sharing class chatkara {

    @AuraEnabled
    public static boolean createRecord(Chatkara__c recordDetails) {
        try {
            if(recordDetails != null){
                insert recordDetails;
                return true;
            }
            return false;
        } catch (DmlException e) {
            System.debug('An error occurred: ' + e.getMessage());
            return false;
        }
    }

}