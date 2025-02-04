public with sharing class AccountOpportunity {
    public String selectedAccountId { get; set; }
    public List<SelectOption> accountOptions { get; set; }
    public ApexPages.StandardSetController setController { get; set; }
    
    public AccountOpportunity(ApexPages.StandardController controller) {
        selectedAccountId = null;
        setController = null;
        accountOptions = getAccountOptions();
    }
    
    public List<SelectOption> getAccountOptions() {
        List<SelectOption> options = new List<SelectOption>();
        options.add(new SelectOption('', '-- Select an Account --'));
        List<Account> accList = [SELECT Id, Name FROM Account ORDER BY Name]

        
        for (Account acc : accList) {
            options.add(new SelectOption(acc.Id, acc.Name));
        }
        return options;
    }

    public void displaySelectedAccount() {
        if (selectedAccountId != null && selectedAccountId != '') {
            setController = new ApexPages.StandardSetController(
                Database.getQueryLocator([SELECT Name FROM Opportunity WHERE AccountId = :selectedAccountId])
            );
            setController.setPageSize(5);
        } else {
            setController = null;
        }
    }

    // Pagination Methods from StandardSetController
    public void first() { setController.first(); }
    public void previous() { setController.previous(); }
    public void next() { setController.next(); }
    public void last() { setController.last(); }
    
    public List<Opportunity> getSelectedAccountOpportunities() {
        if (setController != null) {
            return (List<Opportunity>) setController.getRecords();
        }
        return new List<Opportunity>();
    }
}
