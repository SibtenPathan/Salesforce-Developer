trigger Trigger6 on Opportunity (after Update) {
    for(Opportunity oldOpp : trigger.old){
        for(Opportunity newOpp : trigger.new){
            if(oldOpp.Id == newOpp.Id && oldOpp.Name != newOpp.Name){
                Task task = new task();
                task.OwnerId = newOpp.OwnerId;
                task.Status = 'Not Started';
                task.Priority = 'Normal';
                task.Subject = 'Other';

                insert task;
            }
        }
    }
}