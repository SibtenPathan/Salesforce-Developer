import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createRecord from '@salesforce/apex/chatkara.createRecord';

export default class ChatkaraForm extends LightningElement {
    name;
    phone;
    box40 = false;
    quantity40 = 0;
    box50 = false;
    quantity50 = 0;
    box80 = false;
    quantity80 = 0;
    box200 = false;
    quantity200 = 0;
    recordDetails;
    totalAmount;

    get isQuantity40Disabled() {
        return !this.box40; // Disables the input if box40 is unchecked
    }

    get isQuantity50Disabled() {
        return !this.box50; // Disables the input if box50 is unchecked
    }

    get isQuantity80Disabled() {
        return !this.box80; // Disables the input if box80 is unchecked
    }

    get isQuantity200Disabled() {
        return !this.box200; // Disables the input if box200 is unchecked
    }

    handleChange(event) {
        const field = event.target.name;
        if (event.target.type === 'checkbox') {
            this[field] = event.target.checked;
        } else {
            this[field] = event.target.value;
        }
    }

    handleSave() {
        if (this.name != null) {
            this.recordDetails = { 'Name': this.name, 'Phone__c': this.phone, 'Gola_Rs_40__c': this.box40, 'Gola_Rs_50__c': this.box50, 'Dish_Rs_80__c': this.box80, 'Dish_Rs_200__c': this.box200, 'Gola_40_Quantity__c': this.quantity40, 'Gola_50_Quantity__c': this.quantity50, 'Dish_80_Quantity__c': this.quantity80, 'Dish_200_Quantity__c': this.quantity200 };
            console.log("Details: ", JSON.stringify(this.recordDetails));
            createRecord({ recordDetails: this.recordDetails })
                .then(result => {
                    console.log('Record created successfully:', result);
                    this.totalAmount = ((this.quantity40*40) + (this.quantity50*50) + (this.quantity80*80) + (this.quantity200*200));
                    this.showToast('Record Created Succesfully', 'Total Amount: Rs.' + this.totalAmount, 'success');
                    this.handleCancel();
                })
                .catch(error => {
                    console.error('Error creating record:', error);
                    this.showToast('Error Creating Record', error, 'error');
                });
            
        } else {
            this.showToast('Error', 'Name is required to create a record', 'error');
        }
    }

    handleCancel() {
        console.log('Cancel clicked');
        this.name = '';
        this.phone = '';
        this.box40 = false;
        this.box50 = false;
        this.box80 = false;
        this.box200 = false;
        this.quantity40 = 0;
        this.quantity50 = 0;
        this.quantity80 = 0;
        this.quantity200 = 0;
    }

    showToast(title, message, varient) {
            const evt = new ShowToastEvent({
                title: title,
                message: message,
                variant: varient,
                mode: 'dismissable'
            });
            this.dispatchEvent(evt);
        }
        
        
}
