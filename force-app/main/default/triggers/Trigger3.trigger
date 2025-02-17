trigger Trigger3 on Opportunity (after update) {
    List<Opportunity> opps = [SELECT StageName, CloseDate FROM Opportunity WHERE Id IN :trigger.new];
    if(Trigger3.isFirstTime){
        Trigger3.isFirstTime = false;
        for(Opportunity opp : opps){
            opp.StageName = 'Prospecting';
            opp.CloseDate = Date.today()+15;
        }
        update opps;
    }
}