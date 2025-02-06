import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/PaginationClass.getContacts';

export default class PaginationTask extends LightningElement {
    @wire(getContacts)
    contacts;

    
}