public with sharing class FileUploadController {
    @AuraEnabled
    public static List<Map<String, String>> uploadFile(String fileName, String base64Data) {
        List<Map<String, String>> imageDetails = new List<Map<String, String>>();

        try {
            ContentVersion cv = new ContentVersion();
            cv.Title = fileName;
            cv.PathOnClient = fileName;
            cv.VersionData = EncodingUtil.base64Decode(base64Data);
            insert cv;

            ContentDocument cd = [SELECT Id FROM ContentDocument WHERE LatestPublishedVersionId = :cv.Id LIMIT 1];
            String downloadUrl = '/sfc/servlet.shepherd/version/download/' + cv.Id;
            Map<String, String> imageDetail = new Map<String, String>();
            imageDetail.put('fileName', fileName);
            imageDetail.put('url', downloadUrl);
            imageDetails.add(imageDetail);

            return imageDetails;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
