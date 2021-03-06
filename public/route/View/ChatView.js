import AbstracView from "./AbstractView.js"

export default class extends AbstracView {
    constructor() {
        super();
        this.setTitle("Chat");
    }

    async getHtml() {
        return `
            <div id="chatContainer">
                <div id="intro">
                    <h1 id="chatWelcome">Hi, click the button to start the chat</h1>
                    <h3 id="chatWarning">Please remember, this is not Snapchat, your conversation won't go away</h3>
                    <button onclick="funChat(this)" class="pageButton" id="button1">
                        <span class="text">OK</span>
                    </button>
                    <button onclick="chatBegin()" class="pageButton" id="button2">
                        <span class="text">No problem</span>
                    </button>
                </div>
                <div id="conversationContainer">
                    <div id="conversation">
                        <div class="talking bot">
                            <p>Hello, it is me, bot OpenAI. Ask me anything...</p>
                        </div>
                        <div class="talking human">
                            <p>Hello, it is human here...</p>
                        </div>
                        <div class="talking bot">
                            <p>So, what do you need?</p>
                        </div>
                    </div>
                    <div id="submitContainer">
                        <input type="text" placeholder="Write something..." id="chatPrompt">
                        <button onclick="enterChat()" class="pageButton">
                            <span class="text">Submit</span>
                        </button>
                    </div>
                </div>
            </div>`;
    
    }
}