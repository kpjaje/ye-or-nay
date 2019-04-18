/**
 * Created by sc96275 on 4/17/2019.
 */
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

export class YeaOrNay extends LitElement {
    /**
     * Define properties. Properties defined here will be automatically
     * observed.
     */
    static get properties() {
        return {
            access: {type:Boolean},
            showLogin: {type:Boolean},
            user:{type:Object},

        };
    }

    /**
     * In the element constructor, assign default property values.
     */
    constructor() {
        // Must call superconstructor first.
        super();

        // Initialize properties
       this.showLogin=true;
       this.access=false;
    }

    changeView(e){
        this.access=e.detail.access;
        if(this.access){
            this.user=e.detail.user;
        }

    }

    /**

     /**
     * Define a template for the new element by implementing LitElement's
     * `render` function. `render` must return a lit-html TemplateResult.
     */
    render() {
        return html`
        <style>
        :host { display: block; }
        :host([hidden]) { display: none; }
        </style>
         ${(this.showLogin && !this.access)?html`<login-element @login-event="${this.changeView}">
            <p id="loginApp"></p>
            <script type="text/javascript">
              document.getElementById('loginApp').innerHTML='Loading...';
            </script>
            <noscript>
              Could not render the custom element. Check that JavaScript is enabled.
            </noscript>
         </login-element>`:html``}
         ${this.access?html`<board-element user="${JSON.stringify(this.user)}">
            <p id="myBoard"></p>
            <script type="text/javascript">
              document.getElementById('myBoard').innerHTML='Loading...';
            </script>
            <noscript>
              Could not render the custom element. Check that JavaScript is enabled.
            </noscript>
         </board-element>`:html``}



    `;
    }
}
// Register the element with the browser
customElements.define('yea-or-nay', YeaOrNay);