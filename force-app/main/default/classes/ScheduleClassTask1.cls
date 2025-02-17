public with sharing class ScheduleClassTask1 implements Schedulable {
    
    public void execute(SchedulableContext cxt){
        List<Opportunity> opps = new List<Opportunity>();
        DateTime currentTimestamp = DateTime.now();
        try {
            for(Integer i=0; i<10; i++){
                Opportunity opp = new Opportunity();
                opp.Name = 'ScheduleClassOpportunity'+(i+1)+' => '+ currentTimestamp.toString();
                opp.CloseDate = System.today();
                opp.StageName = 'Prospecting';
                opps.add(opp);
            }
            insert opps;
        } catch (Exception e) {
            System.debug('Error Creating Opportunities: '+e.getMessage());
        }
    }
}