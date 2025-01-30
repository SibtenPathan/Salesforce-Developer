trigger Trigger12 on Account (before insert) {
    Set<String> AccNames = new Set<String>();
    for(Account acc : trigger.new){
        AccNames.add(acc.Name);
    }

    List<Account> similarRecords = [SELECT Id, Name FROM Account WHERE Name IN :AccNames];
    System.debug(similarRecords);
    if(!similarRecords.isEmpty()){
        Delete similarRecords;
    }
}