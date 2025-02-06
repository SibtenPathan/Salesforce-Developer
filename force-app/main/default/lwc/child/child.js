import { api, LightningElement } from 'lwc';

export default class Child extends LightningElement {
    @api message;
    @api world;
}