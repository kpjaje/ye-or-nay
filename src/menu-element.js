/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

// Import LitElement base class and html helper function
import { LitElement, html } from 'lit-element';

export class MenuElement extends LitElement {
    /**
     * Define properties. Properties defined here will be automatically
     * observed.
     */
    static get properties() {
        return {
            menuList: {type:Array},
            selectedCategory:{type:String},
            displayMenu:{type:String},
            userName:{type:String}
        };
    }

    /**
     * In the element constructor, assign default property values.
     */
    constructor() {
        // Must call superconstructor first.
        super();

        // Initialize properties
       // this.menuList=JSON.parse(this.attributes.menuList.value);
        this.displayMenu='none';
        this.selectedCategory='All';
    }

    closeSidebar(){
        console.log('closeSidebar');
        this.displayMenu='none';
        let menuEvent = new CustomEvent('menu-event',{

            detail:{
                type:'displayMenu',
                displayMenu:this.displayMenu
            }
        });
        this.dispatchEvent(menuEvent);
    }

    changeCategory(e){
        this.selectedCategory=e.target.innerText;

        let menuEvent = new CustomEvent('menu-event',{

            detail:{
                type:'changedCategory',
                changedCategory:this.selectedCategory
            }
        });
        this.dispatchEvent(menuEvent);
    }

    /**

     /**
     * Define a template for the new element by implementing LitElement's
     * `render` function. `render` must return a lit-html TemplateResult.
     */
    render() {
        return html`
        <link rel="stylesheet" href="./src/css/social.css">
        <style>
        :host { display: block; }
        :host([hidden]) { display: none; }
        </style>
        <div style="display: ${this.displayMenu};z-index: 2">
            <nav class="w3-sidebar w3-bar-block w3-card" id="mySidebar">
            <div class="w3-container w3-theme-d2">
              <span @click="${this.closeSidebar}" class="w3-button w3-display-topright w3-large">X</span>
              <br>
              <div class="w3-padding w3-center">
                <img class="w3-circle" src="manifest/userAvatar.jpg" alt="avatar" style="width:75%">
                <div style="text-align: center;padding: 5px"><strong>${this.userName}</strong></div>
              </div>
            </div>


            ${this.menuList.length>0  ? this.menuList.map(i => html`<a class="w3-bar-item w3-button" href="#" @click="${this.changeCategory}">${i}</a>`)  : html``}
            </nav>
        </div>




    `;
    }
}
// Register the element with the browser
customElements.define('menu-element', MenuElement);