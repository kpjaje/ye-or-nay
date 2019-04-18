/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at htawesomeolymer.github.io/AUTHORS.txt
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
            tileComments:{type:Array},
            newComment:{type:String},
            showAddComent:{type:String},
            user:{type:Object}
        };
    }

    /**
     * In the element constructor, assign default property values.
     */
    constructor() {
        // Must call superconstructor first.
        super();
        this.tileDetails='';
        this.tileComments=[
            {user:'Tom Black',comment:'Yes I think this two',gender:'M'},
            {user:'Mark Joke',comment:'At the same time you are adding useful tips which the readers of the post can use to solve problems and reap the benefits.',gender:'M'},
            {user:'Adam Rope',comment:'Lets take a look at how to comment properly and build your online profile rather than be labelled a spammer.',gender:'M'},
            {user:'Silvia Thompson',comment:'I guess you’ve probably noticed peoples head shots next to the search results when using Google.',gender:'F'},
            {user:'Hanna Star',comment:'These get more click thru’s than results which don’t feature a persons face. Its the same with comments. Always use an email address which has an avatar attached to it.',gender:'F'},
            {user:'John Known',comment:'Whenever you comment on any blog using the email address you sign up with at Gravatar, your image will be displayed next to your comments. So be thoughtful before you start commenting on blogs in your niche as you build your online identity.',gender:'M'},
            {user:'Julie Smith',comment:'Successful bloggers are known by their name. Many even name their blog the same as their personal name.',gender:'F'},
            {user:'Sam Silly',comment:'If you use your real name, you’ll be taken more seriously and people won’t think you may be trying to hide something.',gender:'M'}

        ];
        this.tileComments.splice(0,Math.floor(Math.random() * 6));
        this.newComment='';
        this.showAddComent='none';
        // Initialize properties



    }

    tileAddNewComment(){
        this.tileComments.unshift({
            user:this.user.name,
            comment:this.newComment,
            gender:this.user.gender
        });
        this.newComment='';
        this.showAddComent='none';
    }

    mapInput(e){
        let inputTmp=e.target;
        if(inputTmp.id==='tileNewComment'){
            this.newComment=inputTmp.value;
        }

    }
    toggleView(){
        if(this.showAddComent==='none'){
            this.showAddComent='block';
        }
        else{
            this.showAddComent='none';
        }
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
        <div class="detailsDiv">
            <span>${this.tileDetails}</span>
        </div>
        <label><div style="padding: 10px">Comments: <iron-icon @click="${this.toggleView}" style="float: right;color: cadetblue" icon="icons:question-answer"></iron-icon></div></label>
        <div style="display: ${this.showAddComent}" class="container1">
            <textarea class="mytextarea" id="tileNewComment" @change="${this.mapInput}" .value="${this.newComment}"  name="comment" placeholder="Write comment" style="height:200px"></textarea>
            <button type="button" @click="${this.tileAddNewComment}" class="btn">Add</button>
        </div>


        ${this.tileComments? html`${this.tileComments.map(i =>html`<div class="comments-container"><div class="chip"><div><img src="${i.gender==='M' ? 'manifest/img_avatarS.png' : 'manifest/img_avatarF.png'}" alt="Person" width="96" height="96">${i.user}</div></div><div class="comments">${i.comment}</div></div>`)}`:html``}

        </div>

    `;
    }
}
// Register the element with the browser
customElements.define('tile-details', TileDetails);