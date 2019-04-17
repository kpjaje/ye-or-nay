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

export class TileDetails extends LitElement {
    /**
     * Define properties. Properties defined here will be automatically
     * observed.
     */
    static get properties() {
        return {
            tileDetails: {type:String},
            tileComments:{type:Array}
        };
    }

    /**
     * In the element constructor, assign default property values.
     */
    constructor() {
        // Must call superconstructor first.
        super();

        // Initialize properties

    }

    /**

     /**
     * Define a template for the new element by implementing LitElement's
     * `render` function. `render` must return a lit-html TemplateResult.
     */
    render() {
        return html`
        <link rel="stylesheet" href="./src/css/tileDetails.css">
        <style>
        :host { display: block; }
        :host([hidden]) { display: none; }
        </style>

        <div class="well">
            Some Text
        </div>


    `;
    }
}
// Register the element with the browser
customElements.define('tile-details', TileDetails);