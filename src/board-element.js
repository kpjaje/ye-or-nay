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
            displayMenu:{type:Boolean},
            menuList: {type:String},
            newTileFlag:{type:Boolean},
            displayNewTile:{type:String}
        };
    }

    /**
     * In the element constructor, assign default property values.
     */
    constructor() {
        // Must call superconstructor first.
        super();

        // Initialize properties
        this.newTileFlag=false;
        this.header={
            name:'Header',
            actions:['New User','Menu']
        };
        this.footer={
            name:'Footer',
            actions:['Search']
        };
        this.content={
            category:'All',
            topicList:[
                {id:0,title:'Movies',comments:'This Is cool',details:'',rating:1,like:'Y',picture:'manifest/img_avatarMovies.jpg'},
                {id:1,title:'Politics',comments:'I hate Trump 1',details:'',rating:2,like:'N',picture:'manifest/img_avatarPolitics.jpg'},
                {id:2,title:'Art',comments:'This is not for me',details:'',rating:3,like:'',picture:'manifest/img_avatarArt.jpg'},
                {id:3,title:'Movies',comments:'This Is cool',details:'',rating:5,like:'',picture:'manifest/img_avatarMovies.jpg'},
                {id:4,title:'Politics',comments:'I hate Trump',details:'',rating:4,like:'Y',picture:'manifest/img_avatarPolitics.jpg'},
                {id:5,title:'Art',comments:'This is not for me',details:'',rating:2,like:'',picture:'manifest/img_avatarArt.jpg'}
            ]
        };
        this.testKris={
            title:'Movies',comments:'This Is cool'
        };
        this.displayMenu='none';
        this.displayNewTile='none';
        this.menuList=JSON.stringify(['All','Movies','Politics','Art']);
    }

    tileChange(e){
        if(e.detail.type==='like'){
            let selectedTile=this.content.topicList.filter(tile => tile.id == e.detail.changedData.id);
            selectedTile[0].rating=e.detail.changedData.rating;
            selectedTile[0].like=e.detail.changedData.data;
        }
        else if(e.detail.type==='newTile'){
            e.detail.changedData.id=this.content.topicList.length;
            this.content.topicList.push(e.detail.changedData);
            this.displayNewTile='none';
            this.newTileFlag=!this.newTileFlag;
        }
    }

    menuChange(e){
        console.dir(e);
        if(e.detail.type==='displayMenu'){
            this.displayMenu=e.detail.displayMenu;
        }
        else if(e.detail.type==='changedCategory'){
            this.content.category=e.detail.changedCategory;
        }
        else if(e.detail.type==='displayNewTile'){
            this.displayNewTile=e.detail.displayNewTile;
        }

    }

    filterTiles(element, index, array){
        return html``;
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





      <div>
        <header-element @header-event="${this.menuChange}" displayMenu="${this.displayMenu}">
         <p id="headerLoader"></p>
           <script type="text/javascript">
                document.getElementById('headerLoader').innerHTML='Loading...';
           </script>
         <noscript>
              Could not render the custom element. Check that JavaScript is enabled.
         </noscript>

        </header-element>
      </div>


      <menu-element menuList="${this.menuList}"  displayMenu="${this.displayMenu}" @menu-event="${this.menuChange}">
            <p id="menuLoader"></p>
              <script type="text/javascript">
                document.getElementById('menuLoader').innerHTML='Loading...';
              </script>
            <noscript>
                Could not render the custom element. Check that JavaScript is enabled.
            </noscript>
      </menu-element>
      <div class="w3-container">
        <div class="w3-cell-row" style="height: 84px"></div>
        <div>
        <new-tile-element displayNewTile="${this.displayNewTile}" @tile-event="${this.tileChange}"></new-tile-element>
        </div>
      ${this.content.topicList && this.content.category!=='All' ? html`<ul style="padding-right: 5px;padding-left: 5px">${this.content.topicList.filter(i => i.title===this.content.category).map(j=> html`<tile-element @tile-event="${this.tileChange}" like="${j.like}" tileRating="${j.rating}" tilePicture="${j.picture}" tileId="${j.id}" tileData="${JSON.stringify(j)}" tileComments="${j.comments}" tileTitle="${j.title}" ></tile-element>`)}</ul>` : html``}

      ${this.content.topicList && this.content.category==='All' ? html`<ul style="padding-right: 5px;padding-left: 5px">${this.content.topicList.map(i =>   html`<tile-element tileComments="${i.comments}" @tile-event="${this.tileChange}" like="${i.like}" tileId="${i.id}" tileRating="${i.rating}" tilePicture="${i.picture}" tileTitle="${i.title}" ></tile-element>`)}</ul>` : html``}
      <div class="w3-cell-row" style="height: 32px"></div>
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