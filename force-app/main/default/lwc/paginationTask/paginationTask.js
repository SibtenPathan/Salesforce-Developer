import { LightningElement, wire, track } from 'lwc';
import getContacts from '@salesforce/apex/PaginationClass.getContacts';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
];

export default class PaginationTask extends LightningElement {
    @track data = [];
    columns = columns;

    pageNumber = 1;
    pageSize = 10;

    get isFirstPage() {
        return this.pageNumber === 1;
    }

    get isLastPage() {
        return this.data.length < this.pageSize;
    }

    @wire(getContacts, { pageNumber: '$pageNumber', pageSize: '$pageSize' })
    wiredContacts({ error, data }) {
        if (data) {
            this.data = data;
        } else if (error) {
            console.error("Error fetching contacts:", error);
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
}
