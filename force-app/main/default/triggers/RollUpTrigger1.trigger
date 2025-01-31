trigger RollUpTrigger1 on Contact (after update, after insert, after delete, after undelete) {
    Set<Id> accountIds = new Set<Id>();

    if(trigger.isUpdate || trigger.isInsert || trigger.isUndelete){
        for(Contact ct : trigger.new){
            if(ct.AccountId != null){
                accountIds.add(ct.AccountId);
            }
        }
    }

    if(trigger.isDelete){
        for(Contact ct : trigger.old){
            if(ct.AccountId != null){
                accountIds.add(ct.AccountId);
            }
        }
    }

    Map<Id,Decimal> AccountAmountMap = new Map<Id,Decimal>();
    for(AggregateResult ar : [SELECT AccountId,SUM(Amount__c) Total FROM Contact WHERE AccountId IN :accountIds GROUP BY AccountId]){
        AccountAmountMap.put((Id)ar.get('AccountId'), (Decimal)ar.get('Total'));
    }

    List<Account> accountsToBeUpdated = new List<Account>();
    for(Id accId : accountIds){
        accountsToBeUpdated.add(new Account(Id = accId, 
        Total_Amount_Trigger__c = AccountAmountMap.containsKey(accId) ? AccountAmountMap.get(AccId) : 0));
    }

    update accountsToBeUpdated;

}