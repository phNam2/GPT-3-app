import AbstracView from "./AbstractView.js"

export default class extends AbstracView {
    constructor() {
        super();
        this.setTitle("Chat");
    }

    async getHtml() {
        return `
            <p>This is chat view</p>`;
    }
}