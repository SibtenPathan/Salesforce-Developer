trigger Trigger2 on Lead (after insert) {
    List<Lead> leads = [select Rating from Lead where Id In :trigger.new]; 
    for(Lead lead : leads){
        lead.Rating = 'Hot';
    }
    Update leads;
}