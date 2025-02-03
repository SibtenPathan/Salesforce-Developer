public with sharing class BulkInsertOpportunities {
    public BulkInsertOpportunities() {
        
    }
    
    public static void BulkInsertOpportunities(Id accountId, String baseName){
        List<Opportunity> opps = new List<Opportunity>();
        
        try {
            for(Integer i=1;i<=5;i++){
                Opportunity o = new Opportunity();
                o.Name = baseName+i;
                o.AccountId = accountId;
                // o.CloseDate = Date.today()+30;
                o.Discount_Percent__c = 10;
                o.Amount_Approved__c = 'Yes';
                o.StageName = 'Prospecting';
                opps.add(o);
            }
            
            insert opps;
        } catch (Exception e) {
            Error_Log.insertErrorLog(e, 'BulkInsertOpportunities', 'BulkInsertOpportunities');
        }
        
    }
}