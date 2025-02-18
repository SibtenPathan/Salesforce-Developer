public with sharing class Error_Log {
    public static void insertErrorLog(Exception e, String className, String methodName){
        Error_Log__c err = new Error_Log__c();
        err.Class_Name__c = className;
        err.Line_Number__c = e.getLineNumber();
        err.Exception_Message__c = e.getMessage();
        err.Exception_Type__c = e.getTypeName();
        err.Method_Name__c = methodName;
        err.More_Details__c = e.getStackTraceString();
        System.debug('insert');
        insert err;
    } 
}