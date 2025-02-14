public with sharing class Task6Lwc {
    @AuraEnabled(cacheable=true)
    public static List<Map<String, String>> getObjects() {
        try {
            Map<String, Schema.SObjectType> gd = Schema.getGlobalDescribe();
            List<Map<String, String>> objectList = new List<Map<String, String>>();

            for (String objectName : gd.keySet()) {
                Map<String, String> objectMap = new Map<String, String>();
                objectMap.put('objectName', objectName);
                objectMap.put('apiName', gd.get(objectName).getDescribe().getName());
                objectList.add(objectMap);
            }

            System.debug('Returning Object List: ' + objectList);
            return objectList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<SObject> searchRecords(String searchText, List<String> selectedObjects){
        if (String.isEmpty(searchText) || selectedObjects.isEmpty()) {
            throw new AuraHandledException('Please enter a search term and select at least one object.');
        }

        List<SObject> results = new List<SObject>();
        try{

            String soslQuery = 'FIND \'' + searchText + '\' IN ALL FIELDS RETURNING ';
            List<String> returnStatements = new List<String>();
            for (String objectName : selectedObjects) {
                returnStatements.add(objectName + ' (Id, Name)');
            }
            soslQuery += String.join(returnStatements, ', ');
            System.debug('Executing SOSL Query: ' + soslQuery);

            List<List<SObject>> searchResults = Search.query(soslQuery);

            for (List<SObject> sObjects : searchResults) {
                results.addAll(sObjects);
            }}
            catch (Exception e) {
                throw new AuraHandledException('Error executing search: ' + e.getMessage());
            }
            return results;
        
    }
}
