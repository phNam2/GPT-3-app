import AbstracView from "./AbstractView.js"

export default class extends AbstracView {
    constructor() {
        super();
        this.setTitle("Search");
    }

    async getHtml() {
        return `
        <div id="SearchContainer">
            <div id="ask">
                <h1>Giigle</h1>
                <input type="text" placeholder="Please ask anything, some may take time..." id="prompt">
                <button onclick="enter()" class="pageButton">
                    <span class="text">Submit</span>
                </button>
            </div>

            <div id="result">
                <h2>Responses:</h2><br>
                <div id="response">

                </div>
            </div>
        <div>`;
    }
}