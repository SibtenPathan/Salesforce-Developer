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