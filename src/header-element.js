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

export class HeaderElement extends LitElement {
    /**
     * Define properties. Properties defined here will be automatically
     * observed.
     */
    static get properties() {
        return {
            header: {type:Object},
            body:{type:Object},
            footer: {type:Object},
            displayMenu:{type:String},


        };
    }

    /**
     * In the element constructor, assign default property values.
     */
    constructor() {
        // Must call superconstructor first.
        super();

        // Initialize properties
            this.header={
                name:'Ye Or Nay',
                actions:['New User','Menu']
            };
            this.displayMenu=false;
            this.displayNewTileFlag='none';
    }



    displayNewTile(){

        if(this.displayNewTileFlag==='block'){
            this.displayNewTileFlag='none';
        }
        else{
            this.displayNewTileFlag='block';
        }
        let headerEvent = new CustomEvent('header-event',{
            detail:{
                type:'displayNewTile',
                displayNewTile:this.displayNewTileFlag
            }
        });
        this.dispatchEvent(headerEvent);
    }

    openSidebar(){
        console.log('openSidebar');
        this.displayMenu='block';
        let headerEvent = new CustomEvent('header-event',{
            detail:{
                type:'displayMenu',
                displayMenu:this.displayMenu
            }
        });
        this.dispatchEvent(headerEvent);
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

            <header class="w3-top w3-bar w3-theme">
              <button class="w3-bar-item w3-button w3-xxlarge w3-hover-theme" @click="${this.openSidebar}">&#9776;</button>
              <h3 class="w3-bar-item">${this.header.name}</h3>
              <div id="addStoryId" class="addStory">
              <iron-icon @click="${this.displayNewTile}"  icon="icons:add-circle-outline"></iron-icon>
              </div>

            </header>



    `;
    }
}
// Register the element with the browser
customElements.define('header-element', HeaderElement);