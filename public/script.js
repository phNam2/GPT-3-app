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
    const result = await response.json();
    console.log(result);

    // Create the response part
    const res = document.getElementById("response");
    let group = document.createElement('i');
    let prompting = document.createElement('div');
    let prompTitle = document.createElement('h3');
    let promtDescription = document.createElement('p');
    let responding = document.createElement('div');
    let responseTitle = document.createElement('h3');
    let responseDes = document.createElement('p');

    prompTitle.innerHTML = "Prompt:";
    promtDescription.innerHTML = result.prompt;
    prompting.appendChild(prompTitle);
    prompting.appendChild(promtDescription);
    responseTitle.innerHTML = "Response: ";
    responseDes.innerHTML = result.output;
    responding.appendChild(responseTitle);
    responding.appendChild(responseDes);

    group.appendChild(prompting);
    group.appendChild(responding);

    if (res.firstChild == null) {
        res.appendChild(group);
    } else {
        res.insertBefore(group, res.firstChild);
    }
    
}