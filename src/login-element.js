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

export class LoginElement extends LitElement {
    /**
     * Define properties. Properties defined here will be automatically
     * observed.
     */
    static get properties() {
        return {
            userName: {type:String},
            userPassword:{type:String},
            userAccess:{type:Boolean}
        };
    }

    /**
     * In the element constructor, assign default property values.
     */
    constructor() {
        // Must call superconstructor first.
        super();
        this.userName='';
        this.userPassword='';
        this.userAccess=false;
        // Initialize properties

        this.users=[
            {

                name:'Kris Jaje',
                login:'KrisJaje',
                pw:'Kris Jaje',
                id:1,
                gender:'M'
            },
            {
                name:'Kenneth Curtis',
                login:'KennethCurtis',
                pw:'Kenneth Curtis',
                id:2,
                gender:'M'
            },
            {
                name:'Cristian Vega',
                login:'CristianVega',
                pw:'Cristian Vega',
                id:3,
                gender:'M'
            },
            {
                name:'Kris Jaje',
                login:'k',
                pw:'k',
                id:4,
                gender:'M'
            }
        ];

    }

    checkAccess(){
        this.user=this.users.filter(user => user.login===this.userName);
        if(this.user.length===1 && this.user[0].pw===this.userPassword){
            this.onLoginAccess(true,this.user[0]);
            this.userAccess=true;
        }
        else{
            this.onLoginAccess(false,false);
            this.userAccess=false;
        }

    }

    mapInput(e){
        let inputTmp=e.target;
        if(inputTmp.id==='userName'){
            this.userName=inputTmp.value;
        }
        else if(inputTmp.id==='userPassword'){
            this.userPassword=inputTmp.value;

        }

    }

    onLoginAccess(access,user){


        let loginEvent = new CustomEvent('login-event', {

                detail: {
                    access: access,
                    user:user
                }
            }
        );
        this.dispatchEvent(loginEvent);

    }

    /**

     /**
     * Define a template for the new element by implementing LitElement's
     * `render` function. `render` must return a lit-html TemplateResult.
     */
    render() {
        return html`
        <link rel="stylesheet" href="./src/css/login.css">
        <style>
        :host { display: block; }
        :host([hidden]) { display: none; }
        </style>

        <form >

          <div class="container">
            <label for="uname"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" id="userName" @change="${this.mapInput}" .value="${this.userName}" name="uname" required>

            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" @change="${this.mapInput}" id="userPassword" .value="${this.userPassword}" name="psw" required>

            <button type="button" @click="${this.checkAccess}">Login</button>
            <label>
              <input type="checkbox" checked="checked" name="remember"> Remember me
            </label>
          </div>

          <div class="container" style="background-color:#f1f1f1">
            <button type="button" class="cancelbtn">Cancel</button>
            <span class="psw">Forgot <a href="#">password?</a></span>
          </div>
        </form>



    `;
    }
}
// Register the element with the browser
customElements.define('login-element', LoginElement);