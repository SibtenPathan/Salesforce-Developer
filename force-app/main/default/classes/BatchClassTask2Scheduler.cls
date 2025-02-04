global class BatchClassTask2Scheduler implements Schedulable {
    global void execute(SchedulableContext sc) {
        BatchClassTask2 obj = new BatchClassTask2(); 
        database.executebatch(obj);
    }
}