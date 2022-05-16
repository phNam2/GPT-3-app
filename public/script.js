// Submit a prompt to get the respone from OpenAI
async function getResponse(prompt) {
    const data = {prompt};
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/completions', options);
    let result = await response.json();
    console.log(result);

    return result;
}

// Submitting a prompt to the OpenAI and return it to the search page
async function enter () {
    const prompt = document.getElementById("prompt").value;
    document.getElementById("prompt").value = "";
    let result = await getResponse(prompt);

    // Create the response part
    const res = document.getElementById("response");
    let group = document.createElement('div');
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
    } else{
        res.insertBefore(group, res.firstChild);
    }
    
}

{/* <script>
        var coll = document.getElementsByClassName("collapsible");
        var i;
        var x = coll.length
        console.log(x);
        
        for (i = 0; i < coll.length; i++) {
          coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
              content.style.display = "none";
            } else {
              content.style.display = "block";
            }
          });
        }
    </script> */}