import AbstracView from "./AbstractView.js"

export default class extends AbstracView {
    constructor() {
        super();
        this.setTitle("Chat");
    }

    async getHtml() {
        return `
            <div id="chatContainer">
                <h1 id="chatWelcome">Hi, click the button to start the chat</h1>
                <h3 id="chatWarning">Please remember, this is not Snapchat, your conversation won't go away</h3>
                <button onclick="chatBegin()">
                    <span class="text">OK</span>
                </button>
                <div id="conversation">

                </div>
            </div>`;
    
    }
}