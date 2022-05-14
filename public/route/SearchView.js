import AbstracView from "./AbstractView.js"

export default class extends AbstracView {
    constructor() {
        super();
        this.setTitle("Search");
    }

    async getHtml() {
        return `
            <div id="ask">
                <h1>Enter the prompt</h1>
                <input type="text" placeholder="Write something here..." id="prompt">
                <button onclick="enter()">
                    <span class="text">Submit</span>
                </button>
            </div>

            <div id="result">
                <h1>Response</h1><br>
                <ul id="response">

                </ul>
            </div>`;
    }
}