import { LightningElement, track } from 'lwc';
import uploadFile from '@salesforce/apex/FileUploadController.uploadFile';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Task3Lwc extends LightningElement {
    @track imageData = [];
    @track currentPage = 1;
    imagesPerPage = 3;

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
            message: 'Your Image uploaded successfully',
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

    get totalPages() {
        return Math.ceil(this.imageData.length / this.imagesPerPage);
    }

    get paginatedImages() {
        const startIndex = (this.currentPage - 1) * this.imagesPerPage;
        const endIndex = startIndex + this.imagesPerPage;
        return this.imageData.slice(startIndex, endIndex);
    }

    get isFirstPage() {
        return this.currentPage === 1;
    }

    get isLastPage() {
        return this.currentPage === this.totalPages;
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage -= 1;
        }
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage += 1;
        }
    }
}
