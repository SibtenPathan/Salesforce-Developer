trigger Trigger5 on Account (after Update) {
    List<Messaging.SingleEmailMessage> mails = new List<Messaging.SingleEmailMessage>();
    List<String> Ids = new List<String>();
    String oldName='';
    String newName='';
    for(Account newAcc : trigger.new){
        for(Account oldAcc : trigger.old){
            if(newAcc.Id == oldAcc.Id && newAcc.Name != oldAcc.Name){
                Ids.add(newAcc.Id);
                oldName=oldAcc.Name;
                newName=newAcc.Name;
            }
        }
    }

    List<Contact> relatedContact = [SELECT Id, Email FROM Contact WHERE AccountId IN :Ids AND Email!=NULL];
    for(Contact ct : relatedContact){
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail.setToAddresses(new List<String> {ct.Email});
        // mail.setSubject('Account Name Changes');
        // mail.setPlainTextBody('Hello your Name '+oldName+' has been changed to '+newName);
        mail.setTemplateId('00XdL00000A0hvF');
        mail.setTargetObjectId(ct.Id);
        mails.add(mail);
    }
 
    if(!mails.isEmpty()){
        Messaging.sendEmail(mails);
        System.debug('Sent');
    }
}
// 2F00XdL00000A0hvF