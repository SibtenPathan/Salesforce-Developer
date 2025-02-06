public with sharing class FutureClassTask {
    
    private ApexPages.StandardController standardController;
    public FutureClassTask(ApexPages.StandardController standardController)
    {
        this.standardController = standardController;
    }
    
    @future
    public static void addImage() {
        Id recordId = standardController.getId();
        Http h = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://api.unsplash.com/photos/random?client_id=6S7IXhLBkVt5x65fGKnpJJ6sCMbITTwqSgqmrSXmH0c');
        req.setMethod('GET');
        
        HttpResponse res = h.send(req);
        Map<String, Object> jsonMap = (Map<String, Object>) JSON.deserializeUntyped(res); 
        String imgLink = jsonMap.get('urls');
        Blob imageblob = Blob.valueOf(imgLink);

        Id cv = createContentVersion('Unsplash-Image',imageblob);

        Id cdId = [Select ContentDocumentId from ContentVersion where Id = cv];
        ContentDocumentLink cd = createContentDocumentLink(cdId, recordId);
        
    }
    
    private ContentVersion createContentVersion(String name, Blob body){
        ContentVersion contentVersion = new ContentVersion();
        contentVersion.ContentLocation = 'E'; // S = Stored in Salesforce, E = external
        contentVersion.PathOnClient = name;
        contentVersion.Title = name;
        contentVersion.VersionData = EncodingUtil.base64Decode(body);
        insert contentVersion
        return contentVersion.Id;
    }

    private ContentDocumentLink createContentDocumentLink(Id contentDocumentId, Id parentId){
        ContentDocumentLink contentDocumentLink = new ContentDocumentLink();
        contentDocumentLink.ContentDocumentId = contentDocumentId;
        contentDocumentLink.LinkedEntityId = parentId;
        contentDocumentLink.ShareType = 'I'; // Inferred permission
        contentDocumentLink.Visibility = 'InternalUsers';
        return contentDocumentLink;
    }
    
}










// public with sharing class FutureClassTask {
    
//     @future(callout=true)
//     public static void addImage(Id recordId) {
//         try {
//             // 1. Perform HTTP callout to fetch a random image URL
//             Http http = new Http();
//             HttpRequest req = new HttpRequest();
//             req.setEndpoint('https://api.unsplash.com/photos/random?client_id=6S7IXhLBkVt5x65fGKnpJJ6sCMbITTwqSgqmrSXmH0c');
//             req.setMethod('GET');
            
//             HttpResponse res = http.send(req);
            
//             if (res.getStatusCode() == 200) {
//                 Map<String, Object> jsonMap = (Map<String, Object>) JSON.deserializeUntyped(res.getBody()); 
//                 Map<String, Object> urls = (Map<String, Object>) jsonMap.get('urls');
//                 String imgLink = (String) urls.get('regular'); // Extract the actual image URL
                
//                 // 2. Perform another HTTP callout to fetch the actual image
//                 HttpRequest imgReq = new HttpRequest();
//                 imgReq.setEndpoint(imgLink);
//                 imgReq.setMethod('GET');
//                 HttpResponse imgRes = http.send(imgReq);

//                 if (imgRes.getStatusCode() == 200) {
//                     Blob imageBlob = imgRes.getBodyAsBlob();

//                     // 3. Create ContentVersion and attach it to the Opportunity
//                     Id cvId = createContentVersion('Unsplash-Image', imageBlob);

//                     // Fetch ContentDocumentId
//                     ContentVersion cv = [SELECT ContentDocumentId FROM ContentVersion WHERE Id = :cvId LIMIT 1];
//                     createContentDocumentLink(cv.ContentDocumentId, recordId);
//                 }
//             }
//         } catch (Exception e) {
//             System.debug('Error in addImage: ' + e.getMessage());
//         }
//     }
    
//     private static Id createContentVersion(String name, Blob body) {
//         ContentVersion contentVersion = new ContentVersion();
//         contentVersion.ContentLocation = 'S'; // Store inside Salesforce
//         contentVersion.PathOnClient = name;
//         contentVersion.Title = name;
//         contentVersion.VersionData = body;
//         insert contentVersion;
//         return contentVersion.Id;
//     }

//     private static void createContentDocumentLink(Id contentDocumentId, Id parentId) {
//         ContentDocumentLink contentDocumentLink = new ContentDocumentLink();
//         contentDocumentLink.ContentDocumentId = contentDocumentId;
//         contentDocumentLink.LinkedEntityId = parentId;
//         contentDocumentLink.ShareType = 'I'; // Inferred permission
//         contentDocumentLink.Visibility = 'InternalUsers';
//         insert contentDocumentLink;
//     }
// }
