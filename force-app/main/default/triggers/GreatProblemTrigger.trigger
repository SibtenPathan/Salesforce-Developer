trigger GreatProblemTrigger on Contact (after insert, after update) {
    if(GreatTriggerClass.isFirstTime){
        GreatTriggerClass.isFirstTime = false;
        Set<Id> accountIds = new Set<Id>();

    for(Contact ct : trigger.new){
        if(ct.AccountId != null){
            accountIds.add(ct.AccountId);
        }
    }

    if(accountIds != null){
        List<Contact> contacts = [SELECT Id,AccountId, Amount_GreatTrigger__c FROM Contact WHERE AccountId IN :accountIds];
        List<Account> accounts = [SELECT Id, Max_Amount_GreatTrigger__c, Name FROM Account WHERE Id IN :accountIds];

        List<Contact> contactToBeInserted = new List<Contact>();
        for(Contact ct : contacts){
            for(Account acc : accounts){
                if(acc.Id == ct.AccountId){
                    boolean flag = false;
                    Decimal ContactAmount = ct.Amount_GreatTrigger__c;
                    Decimal AccountAmount = acc.Max_Amount_GreatTrigger__c;
                    while(true){
                        if(AccountAmount <= ContactAmount){
                            flag = true;
                            Decimal x = ContactAmount - AccountAmount;
                            Contact c = new Contact();
                            if(x <= AccountAmount){
                                c.LastName = acc.Name;
                                c.AccountId = acc.Id;
                                c.Amount_GreatTrigger__c = x;
                                ContactAmount = ContactAmount - AccountAmount;
                            } else {
                                c.LastName = acc.Name;
                                c.AccountId = acc.Id;
                                c.Amount_GreatTrigger__c = AccountAmount;
                                ContactAmount = ContactAmount - AccountAmount;
                            }

                            contactToBeInserted.add(c);
                        } else {
                            break;
                        }
                    }

                    if(flag){
                        Contact c = new Contact();
                        c.LastName = acc.Name;
                        c.AccountId = acc.Id;
                        c.Amount_GreatTrigger__c = AccountAmount;
                        contactToBeInserted.add(c);
                    }
                }
            }
        }
        insert contactToBeInserted;
        delete contacts;
    }
    }
}