public with sharing class Task5Lwc {
    @AuraEnabled
    public static List<Account> getAccounts(){
        try {
            return [SELECT Id, Name, Email__c FROM Account];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Contact> getContacts(){
        try {
            return [SELECT Id, Name, Email FROM Contact];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Lead> getLeads(){
        try {
            return [SELECT Id, Name, Email FROM Lead];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static boolean sendMails(List<String> emailIds, String subject, String body){
        List<Messaging.SingleEmailMessage> mails = new List<Messaging.SingleEmailMessage>();
        for(String emailID : emailIds){
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            mail.setToAddresses(new List<String> {emailID});
            mail.setSubject(subject);
            mail.setPlainTextBody(body);
            mails.add(mail);
        }

        if(!mails.isEmpty()){
            Messaging.sendEmail(mails);
            System.debug('Sent');
            return true;
        }

        return false;
    }
}