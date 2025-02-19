xximport { LightningElement, api, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createAccount from '@salesforce/apex/AccountLWC.createAccount';
import getAccounts from '@salesforce/apex/AccountLWC.getAccounts';
import getTotalRecords from '@salesforce/apex/AccountLWC.getTotalRecords';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'AccountNumber', fieldName: 'AccountNumber', type: 'Text' },
    { label: 'Phone', fieldName: 'Phone', type: 'number' },
    { label: 'Account Site', fieldName: 'Site', type: 'Text' },
];

export default class AccountLWC extends LightningElement {
    @track data = [];
    columns = columns;
    totalRecords;
    @api totalPages
    @api pageNumber = 1;
    pageSize = 10;


    @wire(getTotalRecords)
    wiredTotalRecords({ error, data }) {
        if (data) {
            this.totalRecords = data; 
            this.totalPages = Math.ceil(this.totalRecords / this.pageSize); 
        } else if (error) {
            console.error('Error fetching total records:', error);
        }
    }

    

    get isFirstPage() {
        return this.pageNumber === 1;
    }

    get isLastPage() {
        return this.data.length < this.pageSize;
    }

    @wire(getAccounts, { pageNumber: '$pageNumber', pageSize: '$pageSize' })
    wiredAccounts({ error, data }) {
        if (data) {
            this.data = data;
        } else if (error) {
            console.error("Error fetching accounts:", error);
            this.data = [];
        }
    }

    next() {
        if (this.data.length === this.pageSize) {
            this.pageNumber++;
        }
    }

    previous() {
        if (this.pageNumber > 1) {
            this.pageNumber--;
        }
    }
    first() {
        this.pageNumber = 1;
    }
    last() {
        this.pageNumber = Math.ceil(this.totalRecords / this.pageSize);
    }


    name;
    Acc_number;
    phone;
    site;
    accountDetails;
    validated = false;
    handleChange(event) {
        this[event.target.name] = event.target.value;
        console.log(event.target.name+' => '+this[event.target.name]);
        if (event.target.name == 'phone') {
            // var patern = /^\d{10}$/;
            var patern = /^(?:\+91|91|0)?[789]\d{9}$/;
            if (patern.test(this[event.target.name])) {
                event.target.setCustomValidity('');
                this.validated = true;
            } else {
                event.target.setCustomValidity('Please Enter Valid Mobile Number');
                this.validated = false;
            }
        } else if (event.target.name == 'name') {
            if (this[event.target.name] == '') {
                this.validated = false;
            } else {
                this.validated = true;
            }
        }
    }

    createRecord() {
        if (this.validated) {
            this.accountDetails = { 'Name': this.name, 'AccountNumber': this.Acc_number, 'Site': this.site, 'Phone': this.phone };
            console.log(this.name);
            console.log(this.Acc_number);
            
            createAccount({ accountDetails: this.accountDetails })
                .then((result) => {
                    this.ShowSuccessToast();
                    this.clear();
                    console.log('Account created successfully');
                })
                .catch((error) => {
                    this.showErrorToast();
                    console.error('Error creating Account', error);
                });
        } else {
            this.showErrorToastValidation();
        }
    }

    clear() {
        // this.name = '';
        // this.phone = '';
        // this.site = '';
        // console.log('Acc_number: '+this.Acc_number);
        // this.Acc_number = '';
        // console.log('Acc_number: '+this.Acc_number);
        const allInputs = this.template.querySelectorAll('lightning-input');
        allInputs.forEach(input => input.value = '');
    }


    ShowSuccessToast() {
        const evt = new ShowToastEvent({
            title: 'Account Created',
            message: 'Account ' + this.name + ' Created Succesfully',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }

    showErrorToast() {
        const evt = new ShowToastEvent({
            title: 'Error creating Account',
            message: 'Unexpected error, incomplete Data load',
            variant: 'error',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }

    showErrorToastValidation() {
        const evt = new ShowToastEvent({
            title: 'Validation Error',
            message: 'Please check the validations',
            variant: 'error',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }
}