public with sharing class CustomStringManipulation {
    public CustomStringManipulation() {
    }
    
    public static String getString(String s){
        try {
            String result = '';
            String vowels = 'aeiouAEIOU';
            if(!String.isEmpty(s)){
                for(Integer i=0;i<s.length();i++){
                    if(!vowels.contains(s.subString(i,i+1))){
                        result += (s.subString(i,i+1)).toUpperCase();
                    }
                }
                return result;
            }
            
            return '';
        } catch (Exception e) {
            Error_Log.insertErrorLog(e, 'CustomStringManipulation', 'getString');
            return '';
        }
    }
}