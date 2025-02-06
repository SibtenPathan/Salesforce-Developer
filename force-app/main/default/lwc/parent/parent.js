import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/GetContacts.getContactsList';

export default class Parent extends LightningElement {
    greetingMessage = 'All';
    changeHandler(event){
        this.greetingMessage = event.target.value; 
    }


    @wire(getContacts)
    contacts;
}