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
                {id:0,title:'Tech',comments:'This Is cool',details:'Google News is a news aggregator and app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available on Android, iOS, and the web. A beta version was launched in September 2002, and released officially',rating:1,like:'Y',picture:'manifest/tech.jpg'},
                {id:1,title:'Politics',comments:'I hate Trump',details:'For decades, presidents along with scores of Members of Congress from both political parties have been in agreement that our nation’s immigration system is broken and that a crisis is brewing at our southern border. During his historic 2016 campaign for the presidency, Donald J. Trump, the ultimate political outsider, made border security and building a beautiful border wall the signature issue of his candidacy.',rating:2,like:'N',picture:'manifest/img_avatarPolitics.jpg'},
                {id:2,title:'Art',comments:'I love The Mona Lisa',details:'The Mona Lisa is a half-length portrait painting by the Italian Renaissance artist Leonardo da Vinci that has been described as "the best known, the most visited, the most written about, the most sung about, the most parodied work of art in the world',rating:3,like:'',picture:'manifest/monalisa.jpg'},
                {id:3,title:'Movies',comments:'This Is cool',details:'We all have a superhero inside of us -- it just takes a bit of magic to bring it out. In 14-year-old Billy Batson\'s case, all he needs to do is shout out one word to transform into the adult superhero Shazam',rating:5,like:'',picture:'manifest/img_avatarMovies.jpg'},
                {id:4,title:'Politics',comments:'What about congress',details:'The United States Congress is the bicameral legislature of the Federal Government of the United States. The legislature consists of two chambers: the House of Representatives and the Senate. The Congress meets in the United States Capitol in Washington, D.C',rating:4,like:'Y',picture:'manifest/img_avatarPolitics2.jpg'},
                {id:5,title:'Art',comments:'The Great Wave off Kanagawa',details:'The image depicts an enormous wave threatening three boats off the coast of the town of Kanagawa (the present-day city of Yokohama, Kanagawa Prefecture) while Mount Fuji rises in the background. While sometimes assumed to be a tsunami, the wave is more likely to be a large rogue wave.[2] As in many of the prints in the series, it depicts the area around Mount Fuji under particular conditions, and the mountain itself appears in the background. Throughout the series are dramatic uses of Berlin blue pigment.',rating:2,like:'',picture:'manifest/img_avatarArt.jpg'}
            ]
        };
        this.testKris={
            title:'Movies',comments:'This Is cool'
        };
        this.displayMenu='none';
        this.displayNewTile='none';
        this.menuList=JSON.stringify(['All','Movies','Politics','Art','Tech']);
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
        <div style="display: ${this.displayNewTile}">
        <new-tile-element tileTitle="" displayNewTile="${this.displayNewTile}" @tile-event="${this.tileChange}"></new-tile-element>
        </div>
      ${this.content.topicList && this.content.category!=='All' ? html`<ul style="padding-right: 5px;padding-left: 5px">${this.content.topicList.filter(i => i.title===this.content.category).map(j=> html`<tile-element @tile-event="${this.tileChange}" like="${j.like}" tileRating="${j.rating}" tileDetails="${j.details}" tilePicture="${j.picture}" tileId="${j.id}" tileData="${JSON.stringify(j)}" tileComments="${j.comments}" tileTitle="${j.title}" ></tile-element>`)}</ul>` : html``}

      ${this.content.topicList && this.content.category==='All' ? html`<ul style="padding-right: 5px;padding-left: 5px">${this.content.topicList.map(i =>   html`<tile-element tileComments="${i.comments}" @tile-event="${this.tileChange}" like="${i.like}" tileId="${i.id}" tileRating="${i.rating}" tileDetails="${i.details}" tilePicture="${i.picture}" tileTitle="${i.title}" ></tile-element>`)}</ul>` : html``}
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