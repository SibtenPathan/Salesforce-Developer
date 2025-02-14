import { LightningElement, track } from 'lwc';
import getAccounts from '@salesforce/apex/Task5Lwc.getAccounts';
import getContacts from '@salesforce/apex/Task5Lwc.getContacts';
import getLeads from '@salesforce/apex/Task5Lwc.getLeads';
import sendMails from '@salesforce/apex/Task5Lwc.sendMails';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LwcTask5 extends LightningElement {
    step1 = true;
    step2 = false;
    step3 = false;
    currentStep = 1;
    selectedRows;

    value = 'Select Object to View Records';
    @track data = [];
    @track columns = [];

    subject = '';
    body = '';

    @track all_Emails = [];
    accounts;
    contacts;
    leads;
    connectedCallback() {
        getAccounts()
            .then(result => {
                this.accounts = result;
            })
            .catch(error => {
                console.log('Error fetching Accounts: ' + error);

            })

        getContacts()
            .then(result => {
                this.contacts = result;
            })
            .catch(error => {
                console.log('Error Fetching Contacts: ' + error);

            })

        getLeads()
            .then(result => {
                this.leads = result;
            })
            .catch(error => {
                console.log('Error Fetching Leads: ' + error);

            })


    }

    handleNext() {
        // console.log('Step next: '+this.currentStep);
        if (this.currentStep == 1) {
            if (this.value != 'Select Object to View Records') {
                // console.log('handleNext step 1 called');
                this.handleRowSelection();
                if (this.selectedRows.length == 0) {
                    this.showErrorToast('Select ' + this.value, 'Please Select atleast 1 Value');
                } else {
                    this.currentStep++;
                    this.step1 = false;
                    this.step2 = true;
                    // console.log('Step next after: '+this.currentStep);
                }
            } else {
                this.showErrorToast('Object Not Selected', 'Please select atleast 1 object');
            }
        } else if (this.currentStep == 2) {
            if (this.subject.trim() != '' && this.body.trim() != '') {
                // console.log('handleNext step 2 called');
                this.step2 = false;
                this.step3 = true;
                this.currentStep++;
            } else {
                this.showErrorToast('Both Fields are compulsory', 'Please enter both the fields');
            }
        }
    }

    handleBack() {
        console.log('Step back: ' + this.currentStep);
        if (this.currentStep == 3) {
            this.step3 = false;
            this.step2 = true;
            this.currentStep--;
        } else if (this.currentStep == 2) {
            this.step2 = false;
            this.step1 = true;
            this.currentStep--;
        }
    }

    get backDisabled() {
        return this.currentStep === 1;
    }

    get nextDisabled(){
        return this.currentStep === 3;
    }
    
    showErrorToast(title, message) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: 'error',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }

    ShowSuccessToast(title, message) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }


    // Section1 
    get options() {
        return [
            { label: 'Account', value: 'Account' },
            { label: 'Contact', value: 'Contact' },
            { label: 'Lead', value: 'Lead' },
        ];
    }

    handleChange1(event) {
        this.value = event.detail.value;
        this.getRecords();
    }

    getRecords() {
        if (this.value == 'Account') {
            this.data = this.accounts;
            this.columns = [{
                label: 'Name',
                fieldName: 'Name',
                type: 'text'
            },
            {
                label: 'Email',
                fieldName: 'Email__c',
                type: 'Email'
            }]
        } else if (this.value == 'Contact') {
            this.data = this.contacts;
            this.columns = [{
                label: 'Name',
                fieldName: 'Name',
                type: 'text'
            },
            {
                label: 'Email',
                fieldName: 'Email',
                type: 'Email'
            }]
        } else if (this.value == 'Lead') {
            this.data = this.leads;
            this.columns = [{
                label: 'Name',
                fieldName: 'Name',
                type: 'text'
            },
            {
                label: 'Email',
                fieldName: 'Email',
                type: 'Email'
            }]
        }
    }

    handleRowSelection() {
        this.selectedRows = [];
        this.selectedRows = this.template.querySelector('lightning-datatable').getSelectedRows();
        console.log('Selected rows:', this.selectedRows);
    }

    // Section2
    handleChange2(event) {
        this[event.target.name] = event.target.value;
    }

    // section3
    send() {
        this.all_Emails = [];
        if (this.selectedRows && this.selectedRows.length > 0) {
            this.selectedRows.forEach(element => {
                if (element.Email) {
                    console.log(element.Email);
                    this.all_Emails.push(element.Email);
                } else {
                    console.log(element.Email__c);
                    this.all_Emails.push(element.Email__c);
                }
            });
        }
        console.log('Stored Emails:', JSON.stringify(this.all_Emails));

        sendMails({ emailIds: this.all_Emails, subject: this.subject, body: this.body })
            .then(result => {
                console.log(result);
                if (result) {
                    this.ShowSuccessToast('Mail Sent Succesfully', 'Your Mails has been sent');
                    this.clear();
                } else {
                    this.showErrorToast('Error', 'Error Sending Email please check Email Address');
                }

            })
            .catch(error => {
                console.log(error);
                this.showErrorToast('Error', 'Error Sending Email please check Email Address');
            })

    }

    clear(){
        console.log('clear method called');
        this.subject = '';
        this.body = '';
        this.data = [];
        this.columns = [];
        this.value = 'Select Object to View Records';
        this.step1 = true;
        this.step2 = false;
        this.step3 = false;
        this.currentStep = 1;
    }
}