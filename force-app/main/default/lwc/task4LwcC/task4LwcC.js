import { LightningElement, wire, track } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import ACCOUNT_ID_MESSAGE_CHANNEL from '@salesforce/messageChannel/Task4Lmc__c';
import getContacts from '@salesforce/apex/Task4Lwc.getContacts';
import getOpportunities from '@salesforce/apex/Task4Lwc.getOpportunities';

export default class Task4LwcC extends LightningElement {
    accountId = '';
    @track contactList;
    @track opportunityList;
    @track contactColumns = [{
        label: 'FirstName',
        fieldName: 'FirstName',
        type: 'text'
    },
    {
        label: 'LastName',
        fieldName: 'LastName',
        type: 'text'
    },
    {
        label: 'Email',
        fieldName: 'Email',
        type: 'email'
    }]

    @track opportunityColumns = [{
        label: 'Name',
        fieldName: 'Name',
        type: 'text'
    },
    {
        label: 'Amount',
        fieldName: 'Amount',
        type: 'Currency'
    },
    {
        label: 'CloseDate',
        fieldName: 'CloseDate',
        type: 'Date'
    }
]

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.subscription = subscribe(
            this.messageContext,
            ACCOUNT_ID_MESSAGE_CHANNEL,
            (message) => this.handleMessage(message)
        );
    }

    handleMessage(message) {
        this.accountId = message.accountId;
        console.log('Received Account Id: ', this.accountId);
        this.getRecords();
    }

    getRecords(){
        getContacts({acc_Id: this.accountId})
        .then(result => {
            this.contactList = result;
        })
        .catch(error => {
            console.log('Error Fetching Contacts: '+error);
            
        })

        getOpportunities({acc_Id: this.accountId})
        .then(result => {
            this.opportunityList = result;
        })
        .catch(error => {
            console.log('Error Fetching Opportunities: '+error);
        })
    }

}