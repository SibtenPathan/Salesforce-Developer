trigger Trigger9 on Account (after insert) {
    for(Account acc : trigger.new){
        Approval.ProcessSubmitRequest req = new Approval.ProcessSubmitRequest();
        req.setProcessDefinitionNameOrId('Approve_New_Account');
        req.setObjectId(acc.Id);
        req.setComments('Please Approve the Request for New Account');
        req.setSkipEntryCriteria(true);
        Approval.ProcessResult result = Approval.Process(req);

        if(!result.isSuccess()){
            System.debug('Error Submitting Approval Request');
        }
    }
}