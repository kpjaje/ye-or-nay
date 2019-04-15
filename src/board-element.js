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

export class BoardElement extends LitElement {
    /**
     * Define properties. Properties defined here will be automatically
     * observed.
     */
    static get properties() {
        return {
            header: {type:Object},
            body:{type:Object},
            footer: {type:Object},
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
            name:'Header',
            actions:['New User','Menu']
        },
        this.footer={
            name:'Footer',
            actions:['Search']
        },
        this.content={
            topicList:[{title:'Movies',comments:'This Is cool'},{title:'Politics',comments:'I hate Trump'},{title:'Art',comments:'This is not for me'},{title:'Movies',comments:'This Is cool'},{title:'Politics',comments:'I hate Trump'},{title:'Art',comments:'This is not for me'}]
        }
        this.testKris={
            title:'Movies',comments:'This Is cool'
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
       <header>
            <header-element>
              <p id="headerLoader"></p>
              <script type="text/javascript">
                document.getElementById('headerLoader').innerHTML='Loading...';
              </script>
            <noscript>
                Could not render the custom element. Check that JavaScript is enabled.
            </noscript>
          </header-element>
      </header>
      <div class="w3-container" style="margin-top:90px;margin-bottom:70px ">
      ${this.content.topicList ? html`<ul style="padding-right: 5px;padding-left: 5px">${this.content.topicList.map(i =>  html`<tile-element tileComments="${i.comments}" tileTitle="${i.title}" ></tile-element>`)}</ul>` : html``}
      </div>
      <footer-element>
            <p id="footerLoader"></p>
              <script type="text/javascript">
                document.getElementById('footerLoader').innerHTML='Loading...';
              </script>
            <noscript>
                Could not render the custom element. Check that JavaScript is enabled.
            </noscript>
      </footer-element>


      </body>

    `;
    }
}
// Register the element with the browser
customElements.define('board-element', BoardElement);