trigger Trigger4 on Opportunity (after insert) {
    List<Opportunity> opps = [select Type from Opportunity where Id in :trigger.new];
    for(Opportunity opp:opps){
        opp.Type = 'New Customer';
    }
    Update opps;
} 