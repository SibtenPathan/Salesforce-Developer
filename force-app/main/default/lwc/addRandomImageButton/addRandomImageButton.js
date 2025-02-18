import { LightningElement, api } from 'lwc';
import attachRandomImage from '@salesforce/apex/RandomImageAttachment.attachRandomImage';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AddRandomImageButton extends LightningElement {
    @api recordId; // Opportunity ID
    isLoading = false;

    handleClick() {
        this.isLoading = true;
        attachRandomImage({ opportunityId: this.recordId })
            .then(() => {
                this.showToast('Success', 'Random Image Attached to Opportunity, Please refresh the Page', 'success');
            })
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
            })
            .finally(() => {
                this.isLoading = false;
            });
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
}
