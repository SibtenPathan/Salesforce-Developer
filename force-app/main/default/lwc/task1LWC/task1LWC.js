import { LightningElement, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createContact from '@salesforce/apex/Task1LWC.createContact';

export default class LWCtask1 extends LightningElement {
    salutation = '';
    f_name = '';
    l_name = '';
    phone = '';
    email = '';
    birthdate = ''; 

    validated = false;

    contactDetails;
    handleChange(event){
        this[event.target.name] = event.target.value;
        if(event.target.name == 'l_name'){
            if(this[event.target.name] == ''){
                this.validated = false;
            } else {
                this.validated = true;
            }
        }
    }

    handlePhoneChange(event) {
        this[event.target.name] = event.target.value;
        console.log('phone',this[event.target.name]);
        
        var patern = /^(?:\+91|91|0)?[789]\d{9}$/;
        if(patern.test(this[event.target.name])){
            event.target.setCustomValidity('');
            this.validated = true;
        } else {
            event.target.setCustomValidity('Please Enter Valid Mobile Number');
            this.validated = false;
        }
    }

    get options() {
        return [
            { label: 'Mr.', value: 'Mr.' },
            { label: 'Ms.', value: 'Ms.' },
            { label: 'Mrs.', value: 'Mrs.' },
            { label: 'Dr.', value: 'Dr.' },
            { label: 'Prof.', value: 'Prof.' },
        ];
    }

    createRecord() {
        if(this.validated){
            // this.contactDetails = {'salutation':this.salutation, 'f_name':this.f_name, 'l_name':this.l_name, 'phone':this.phone, 'email':this.email, 'birthday':this.birthdate };
        this.contactDetails = {'Salutation':this.salutation, 'FirstName':this.f_name, 'LastName':this.l_name, 'Phone':this.phone, 'Email':this.email, 'Birthdate':this.birthdate };
        createContact({ contactDetails: this.contactDetails })
            .then((result) => {
                this.ShowSuccessToast();
                console.log('Contact created successfully');
            })
            .catch((error) => {
                this.showErrorToast();
                console.error('Error creating contact', error);
            });
        } else {
            this.showErrorToastValidation();
        }
    }


    ShowSuccessToast(){
        const evt = new ShowToastEvent({
            title: 'Contact Created',
            message: 'Contact '+this.l_name+' Created Succesfully',
            variant: 'success',
            mode: 'dismissable'
          });
          this.dispatchEvent(evt);
    }

    showErrorToast(){
        const evt = new ShowToastEvent({
        title: 'Error creating Contact',
        message: 'Unexpected error, incomplete Data load',
        variant: 'error',
        mode: 'dismissable'
    });
    this.dispatchEvent(evt);
    }

    showErrorToastValidation(){
        const evt = new ShowToastEvent({
        title: 'Validation Error',
        message: 'Please check the validations',
        variant: 'error',
        mode: 'dismissable'
    });
    this.dispatchEvent(evt);
    }
}




