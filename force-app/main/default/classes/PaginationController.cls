public with sharing class PaginationController {

    public integer PageSize {get;set;}
    public integer PageNumber {get;set;}
    public integer RecordCount {get;set;}

    public PaginationController() {
        PageSize = 10;
        PageNumber = 1;
        RecordCount = [Select Count() from Contact];
    }

    public integer PageIndex {
        get { return (PageNumber - 1); }
    } 

    // public integer PageCount {
    //     get { return getPageCount(); }
    // }
      
    public integer Offset {
        get { return (PageSize * PageIndex); }
    }

    public Account[] getAccounts() {
        try {
            Account[] objAccList = [Select Id, Name, phone
                                    From Contact order by Name 
                                    Limit :PageSize
                                    offset :Offset];
                                      
            return objAccList;
        }
        catch (QueryException e) {
            ApexPages.addMessages(e);   
            return null;
        }
    }
      
    public integer LNumber {
        get { return RecordCount == 0 ? 0 : (Offset + 1); }
    }

    public integer UNumber {
        get { 
            integer iUNum = ((LNumber + PageSize) - 1);
            return (iUnum > RecordCount) ? RecordCount : iUNum; 
        }
    }
      
    public boolean AllowMoveNext {
        get{ return ((PageIndex + 1) < PageCount); } }
      
}