import Search from "./View/SearchView.js"
import Chat from "./View/ChatView.js"
import SearchHistory from "./View/SearchHisView.js"
import ChatHistory from "./View/ChatHisView.js"

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}


const router = async() => {
    const routes = [
        {path: "/", view: Search},
        {path: "/chat", view: Chat},
        {path: "/searchHistory", view: SearchHistory},
        {path: "/chatHistory", view: ChatHistory},
    ];

    // Testing for route call
    const matches = routes.map(route =>{
        return {
            route: route,
            isMatch: location.pathname == route.path
        }
    });
    let match = matches.find(potentialMatch => potentialMatch.isMatch);
    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        };
    }
    // console.log(match.route.view());

    const view = new match.route.view();
    document.querySelector("#app").innerHTML = await view.getHtml();
};

document.addEventListener("DOMContentLoaded", () =>{
    document.body.addEventListener("click", e => {
        // Prevent reload the page when click to the navbar
        if(e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    window.addEventListener("popstate", router);// handle the back button
    router();
});