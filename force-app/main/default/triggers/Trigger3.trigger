trigger Trigger3 on Opportunity (after update) {
    List<Opportunity> opps = [select StageName, CloseDate from Opportunity where Id in :trigger.new];
    if(Trigger3.isFirstTime){
        Trigger3.isFirstTime = false;
        for(Opportunity opp : opps){
            opp.StageName = 'Prospecting';
            opp.CloseDate = Date.today()+15;
        }
        update opps;
    }
}