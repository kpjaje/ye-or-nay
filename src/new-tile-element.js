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

export class NewTileElement extends LitElement {
    /**
     * Define properties. Properties defined here will be automatically
     * observed.
     */
    static get properties() {
        return {
            displayNewTile: {type:String},
            tileTitle: {type:String},
            tileComments:{type:String},
            tilePicture: {type:String},
            tileDetails:{type:String},
            newImagePath:{type:String}
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
        this.tileDetails='';
        this.imageData='';
        this.newImagePath='';
        this.displayNewTile='none';

    }
    updated(changedProperties) {
        changedProperties.forEach((oldValue, propName) => {
            console.log(`${propName} changed. oldValue: ${oldValue}`);
        });
    }

    onTileDataChange(type,changedData){


        let newTileEvent = new CustomEvent('tile-event',{

            detail:{
                type:type,
                changedData:changedData
            }
        });
        this.clearData();
        this.dispatchEvent(newTileEvent);

    }


    imageUpload(e){
        console.dir(e);
        let image=e.target;
        this.newImagePath=URL.createObjectURL(e.target.files[0]);
        console.dir(image);
        console.log(this.imageData)
    }
    tileAddNewStory(){
        let changedData={
            id:null,
            title:this.tileTitle,
            comments:this.tileComments,
            details:this.tileDetails,
            rating:0,
            like:'',
            picture:this.newImagePath
        }
        this.onTileDataChange('newTile',changedData);
    }
    clearData(){
        this.tileTitle='';
        this.tileComments='';
        this.tileDetails='';
        this.imageData='';
        this.newImagePath='';
    }
    mapInput(e){
        let inputTmp=e.target;
        if(inputTmp.id==='tileTitle'){
            this.tileTitle=inputTmp.value;
        }
        else if(inputTmp.id==='tileComments'){
            this.tileComments=inputTmp.value;

        }
        else if(inputTmp.id==='tileDetails'){
            this.tileDetails=inputTmp.value;

        }
        console.log(e.target);
    }

    getTileTitle(){
        return html`<input id="tileTitle" class="input-field" @change="${this.mapInput}" .value="${this.tileTitle}" type="text" placeholder="Title" name="usrnm">`;
    }

    /**

     /**
     * Define a template for the new element by implementing LitElement's
     * `render` function. `render` must return a lit-html TemplateResult.
     */
    render() {
        return html`
        <link rel="stylesheet" href="./src/css/newTile.css">
        <style>
        :host { display: block; }
        :host([hidden]) { display: none; }
        </style>
        <form  style="max-width:500px;margin:auto" style="display: ${this.displayNewTile}">
          <h2>Add Story</h2>
          <div class="input-container">
            <i class="icon"><iron-icon  icon="icons:folder-shared"></iron-icon></i>
            ${this.getTileTitle()}

          </div>

          <div class="input-container">
            <i class="icon"><iron-icon @click=""  icon="icons:lightbulb-outline"></iron-icon></i>
            <input id="tileComments" @change="${this.mapInput}" class="input-field" type="text" .value="${this.tileComments}" placeholder="Summery" name="email">
          </div>

          <div class="input-container ">
            <label class="icon">
               <i class=" fileContainer"><iron-icon  icon="icons:camera-enhance"></iron-icon></i>

                <span class="fileContainer">
                 <input id="newTileImage" @change="${this.imageUpload}" value="${this.imageData}" type="file"/>
                </span>
            </label>
            <input class="input-field" disabled type="text" placeholder="Image Data" name="image">



          </div>
          <div class="input-container ">
          ${this.newImagePath? html` <img class="w3-circle myImg" src="${this.newImagePath}" style="width:100%">`:html``}
          </div>


          <div class="container1">
            <label for="subject">Details</label>
            <textarea class="mytextarea" id="tileDetails" @change="${this.mapInput}" .value="${this.tileDetails}" id="subject" name="subject" placeholder="Write whatever you want" style="height:200px"></textarea>
          </div>

          <button type="button" @click="${this.tileAddNewStory}" class="btn">Add</button>
        </form>




    `;
    }
}
// Register the element with the browser
customElements.define('new-tile-element', NewTileElement);