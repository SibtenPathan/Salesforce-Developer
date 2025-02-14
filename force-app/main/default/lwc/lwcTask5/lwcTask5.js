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

    handleNext() {
        if (this.currentStep == 1) {
            if (this.value != 'Select Object to View Records') {
                this.handleRowSelection();
                this.step1 = false;
                this.step2 = true;
                this.currentStep++;
            } else {
                this.showErrorToast('Object Not Selected', 'Please select atleast 1 object');
            }
        } else if (this.currentStep == 2) {
            if(this.subject != ''){
                this.step2 = false;
            this.step3 = true;
            this.currentStep++;
            } else {
                this.showErrorToast('Subject Field is compulsory', 'Please enter subject field');
            }
        }
    }

    handleBack() {
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
    value = 'Select Object to View Records';
    @track data = [];
    @track columns = [];

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
            getAccounts()
                .then(result => {
                    this.data = result;
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
                    console.log(result);
                })
                .catch(error => {
                    console.log('Error fetching Accounts: ' + error);

                })
        } else if (this.value == 'Contact') {
            getContacts()
                .then(result => {
                    this.data = result;
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
                    console.log(result);
                })
                .catch(error => {
                    console.log('Error fetching Contacts: ' + error);

                })
        } else if (this.value == 'Lead') {
            getLeads()
                .then(result => {
                    this.data = result;
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
                    console.log(result);
                })
                .catch(error => {
                    console.log('Error fetching Leads: ' + error);

                })
        }
    }

    handleRowSelection() {
        this.selectedRows = this.template.querySelector('lightning-datatable').getSelectedRows();
        console.log('Selected rows:', this.selectedRows);
    }

    // Section2
    subject;
    body;

    handleChange2(event) {
        this[event.target.name] = event.target.value;
    }

    // section3
    @track all_Emails = []; // Ensure reactivity
    send() {
        this.all_Emails = []; // Reset the array before adding new emails
        if (this.selectedRows && this.selectedRows.length > 0) {
            let tempEmails = []; // Temporary array to store emails
            this.selectedRows.forEach(element => {
                if (element.Email) {
                    console.log(element.Email);
                    tempEmails.push(element.Email); // Push emails into the temp array
                } else{
                    console.log(element.Email__c);
                    tempEmails.push(element.Email__c);
                }
            });
            this.all_Emails = [...tempEmails]; // Update the tracked array in one go
        }
        console.log('Stored Emails:', JSON.stringify(this.all_Emails)); // Debugging

        sendMails({ emailIds: this.all_Emails, subject: this.subject, body: this.body })
            .then(result => {
                console.log(result);
                if (result) {
                    this.ShowSuccessToast('Main Sent Succesfully', 'Your Mails has been sent');
                    this.subject = '';
                    this.body = '';
                    this.step1 = true;
                    this.step2 = false;
                    this.step3 = false;
                    this.value = 'Select Object to View Records'
                    this.data = [];
                } else {
                    this.showErrorToast('Error', 'Error Sending Email please check Email Address');
                    this.subject = '';
                    this.body = '';
                    this.step1 = true;
                    this.step2 = false;
                    this.step3 = false;
                    this.value = 'Select Object to View Records'
                    this.data = [];
                }

            })
            .catch(error => {
                console.log(error);
                this.showErrorToast('Error', 'Error Sending Email please check Email Address');
                this.subject = '';
                    this.body = '';
                    this.step1 = true;
                    this.step2 = false;
                    this.step3 = false;
                    this.value = 'Select Object to View Records'
                    this.data = [];

            })

    }
}