import AbstracView from "./AbstractView.js"

export default class extends AbstracView {
    constructor() {
        super();
        this.setTitle("Search History");
    }

    async getHtml() {
        return `
            <h1>Search History:</h1>
            <button id="historyButton" onclick="openSearchHistory()" class="pageButton">
                <span class="text">Show</span>
            </button>

            <h3 id="historyEmpty"></h3>
            <div id="historyContainer">
                
            </div>`;
    }
}