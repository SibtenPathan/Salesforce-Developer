import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import ACCOUNT_ID_MESSAGE_CHANNEL from '@salesforce/messageChannel/Task4Lmc__c';
import getOptions from '@salesforce/apex/Task4Lwc.getOptions';

export default class Task4LwcP extends LightningElement {
    value = '';
    options = [];
    optionsLoaded = false;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        getOptions().then(result => {
            for (var i = 0; i < result.length; i++) {
                this.options.push({ label: result[i].Name, value: result[i].Id });
            }
            this.optionsLoaded = true;
        })
        .catch(error => {
            console.log(JSON.stringify(error));
        });
    }

    handleChange(event) {
        this.value = event.detail.value;
        this.sendAccountId(this.value);
    }

    sendAccountId(accountId) {
        const message = {
            accountId: accountId
        };

        // Publish the message to the message channel
        publish(this.messageContext, ACCOUNT_ID_MESSAGE_CHANNEL, message);
    }
}
