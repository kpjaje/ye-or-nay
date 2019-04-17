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

export class TileElement extends LitElement {
    /**
     * Define properties. Properties defined here will be automatically
     * observed.
     */
    static get properties() {
        return {
            tileTitle: {type:String},
            tileComments:{type:String},
            like:{type:String},
            tileData:{type:Object},
            tileId:{type:Number},
            tileRating:{type:Number},
            tilePicture:{type:String},
            visibleDetails:{type:String},
            tileDetails:{type:String}
        };
    }

    /**
     * In the element constructor, assign default property values.
     */
    constructor() {
        // Must call superconstructor first.
        super();

        // Initialize properties
        this.tileTitle='';
        this.tileComments='';
        this.tileData={};
        this.like='';
        this.tilePicture='';
        this.visibleDetails='none'


    }


    changeTodontLike(){
        if(this.like=='N'){
            this.like='';
            this.tileRating+=1;
        }
        else{
            this.like='N';
            this.tileRating-=1;
        }
        let changedData={
            data:this.like,
            id:this.tileId,
            rating:this.tileRating
        };
        this.onTileDataChange('like',changedData);
    }

    changeToLike(){

        if(this.like=='Y'){
            this.like='';
            this.tileRating-=1;
        }
        else{
            this.like='Y';
            this.tileRating+=1;
        }
        let changedData={
            data:this.like,
            id:this.tileId,
            rating:this.tileRating
        };

        this.onTileDataChange('like',changedData);
    }

    onTileDataChange(type,changedData){


        let tileEvent = new CustomEvent('tile-event',{

            detail:{
                type:type,
                changedData:changedData
            }
        });
        this.dispatchEvent(tileEvent);
    }

    showDetails(){
        if( this.visibleDetails==='none'){
            this.visibleDetails='block'
        }
        else{
            this.visibleDetails='none'
        }
    }

    /**

     /**
     * Define a template for the new element by implementing LitElement's
     * `render` function. `render` must return a lit-html TemplateResult.
     */
    render() {
        return html`
        <link rel="stylesheet" href="./src/css/social.css">
        <link rel="stylesheet" href="./src/css/tile.css">
        <style>
        :host {

            display: block;
        }
        :host([hidden]) { display: none; }
        </style>

        <div class="w3-cell-row" >
        <div class="seeDetails">
            ${this.visibleDetails==='none'? html`<iron-icon @click="${this.showDetails}"  icon="icons:visibility"></iron-icon>`: html``}
            ${this.visibleDetails==='block'? html`<iron-icon @click="${this.showDetails}"  icon="icons:visibility-off"></iron-icon>`: html``}

        </div>

          <div class="w3-cell" style="width:30%">
            <img class="w3-circle" src="${this.tilePicture}" style="width:100%">
            <div>
                <div style="text-align: center;padding-top: 5px">
                    <iron-icon  @click="${this.changeToLike}" style="color: ${this.like==='Y'?'royalblue':''};" icon="icons:thumb-up"></iron-icon>
                    <span>${this.tileRating}</span>
                    <iron-icon  @click="${this.changeTodontLike}" style="color: ${this.like==='N'?'maroon':''};" icon="icons:thumb-down"></iron-icon>
                </div>

            </div>
          </div>
          <div class="w3-cell w3-container">
            <h4>${this.tileTitle}</h4>
            <p>${this.tileComments}</p>
          </div>
        </div>
        <div style="display: ${this.visibleDetails}" class="w3-cell-row" >
         <tile-details tileDetails="${this.tileDetails}"></tile-details>
        </div>
        <hr>



    `;
    }
}
// Register the element with the browser
customElements.define('tile-element', TileElement);