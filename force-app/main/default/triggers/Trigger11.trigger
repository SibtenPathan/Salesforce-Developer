trigger Trigger11 on Contact (after insert) {
    for(Contact ct : trigger.new){
        Event ev = new Event();
        ev.Subject = ct.LastName;
        ev.StartDateTime = Date.today();
        ev.EndDateTime = Date.today()+2;
        ev.WhoId = ct.Id;
        ev.OwnerId = ct.OwnerId;

        insert ev;
    }
}