import { LightningElement, wire, track } from 'lwc';
import getObjects from '@salesforce/apex/Task6Lwc.getObjects';
import searchRecords from '@salesforce/apex/Task6Lwc.searchRecords';

export default class Task6Lwc extends LightningElement {
    @track options = [];
    @track searchValue = '';
    @track _selected = [];
    @track searchResults = [];

    @wire(getObjects)
    wiredObjects({ error, data }) {
        if (data) {
            this.options = data.map(obj => ({
                label: obj.objectName,
                value: obj.apiName
            }));
        } else if (error) {
            console.error('Error retrieving data:', error);
        }
    }

    get selected() {
        return this._selected.length ? this._selected.join(', ') : 'None';
    }

    handleChange(event) {
        this._selected = event.detail.value;
    }

    handleSearch(event) {
        this.searchValue = event.target.value;
    }

    handleClick() {
        if (!this.searchValue || this._selected.length === 0) {
            alert('Please enter a search term and select at least one object.');
            return;
        }

        searchRecords({ searchText: this.searchValue, selectedObjects: this._selected })
            .then(result => {
                console.log('Search Results:', result);
                this.searchResults = result;
            })
            .catch(error => {
                console.error('Error in search:', error);
            });
    }
}
