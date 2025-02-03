trigger Trigger1 on Account (before insert) {
    System.debug('isExecuting: '+trigger.isExecuting);
    System.debug('isInsert: '+trigger.isInsert);
    System.debug('isUpdate: '+trigger.isUpdate);
    System.debug('isDelete: '+trigger.isDelete);
    System.debug('isBefore: '+trigger.isBefore);
    System.debug('isAfter: '+trigger.isAfter);
    System.debug('isUndelete: '+trigger.isUndelete);
    System.debug('New: '+trigger.new);
    System.debug('newMap: '+trigger.newMap);
    System.debug('old: '+trigger.old);
    System.debug('oldMap: '+trigger.oldMap);
    System.debug('operationType: '+trigger.operationType);
    System.debug('size: '+trigger.size);
}