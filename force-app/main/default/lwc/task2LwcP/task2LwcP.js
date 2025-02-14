import { LightningElement, track } from 'lwc';
import uploadFile from '@salesforce/apex/FileUploadController.uploadFile';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class TaskLwcP extends LightningElement {
    @track imageData = [];

    handleFileChange(event) {
        const files = event.target.files;
        if (files && files.length > 0) {
            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onload = () => {
                    const base64 = reader.result.split(',')[1];
                    this.uploadImage(file.name, base64);
                };
                reader.readAsDataURL(file);
            });
        }
    }

    uploadImage(fileName, base64Data) {
        uploadFile({ fileName: fileName, base64Data: base64Data })
            .then(result => {
                result.forEach(imageDetail => {
                    this.imageData = [...this.imageData, {
                        name: imageDetail.fileName,
                        url: imageDetail.url
                    }];
                });
                this.ShowSuccessToast();
            })
            .catch(error => {
                console.error('Error uploading file:', error);
                this.showErrorToast();
            });
    }

    ShowSuccessToast() {
        const evt = new ShowToastEvent({
            title: 'Image Uploaded',
            message: 'Your Image uploaded Succesfully',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }

    showErrorToast() {
        const evt = new ShowToastEvent({
            title: 'Error Uploading Image',
            message: 'Error Uploading Image',
            variant: 'error',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }
}
