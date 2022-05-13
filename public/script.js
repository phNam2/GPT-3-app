const { response } = require("express");

async function enter () {
    const prompt = document.getElementById("prompt").value;
    document.getElementById("prompt").value = "";

    const data = {prompt};
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/completions', options);
    const json = await response.json();
    console.log(json);
}