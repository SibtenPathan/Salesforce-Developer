public with sharing class RandomImageAttachment {
    
    @AuraEnabled
    @future(callout=true)
    public static void attachRandomImage(Id opportunityId) {
        try {
            Http http = new Http();
            HttpRequest request = new HttpRequest();
            request.setEndpoint('https://api.unsplash.com/photos/?client_id=6S7IXhLBkVt5x65fGKnpJJ6sCMbITTwqSgqmrSXmH0c');
            request.setMethod('GET');
            HttpResponse response = http.send(request);
            System.debug('Hello');

            List<Object> parsedJson = (List<Object>) JSON.deserializeUntyped(response.getBody());
            System.debug('parsedJson: '+parsedJson);
            
            Map<String, Object> firstImage = (Map<String, Object>) parsedJson.get(0);
            Map<String, Object> urls = (Map<String, Object>) firstImage.get('urls');
            String regularUrl = (String) urls.get('regular');
            
            System.debug('Regular URL: ' + regularUrl);
            
            HttpRequest imageRequest = new HttpRequest();
            imageRequest.setEndpoint(regularUrl);
            imageRequest.setMethod('GET');
            HttpResponse imageResponse = http.send(imageRequest);

            Blob imageData = imageResponse.getBodyAsBlob();
            
            Attachment attachment = new Attachment();
            attachment.Body = imageData;
            attachment.Name = 'ExternalImage.jpg';
            attachment.ParentId = opportunityId;
            
            insert attachment;

        } catch (Exception e) {
            System.debug('Error: ' + e.getMessage());
        }
    }
}
