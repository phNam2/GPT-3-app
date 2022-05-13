const express = require('express');
require('dotenv').config();
const got = require('got');


// Set up the web port host
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server at ${port}`)); //http://localhost:3000
app.use(express.static('public')); // Local folder for html
app.use(express.json({limit: '1mb'}));


// OpenAI Completions function
app.post('/completions', (request, response) => {
    console.log("Got it");
    console.log(request.body);

    const prompt = JSON.stringify(request.body);// The text from client-side

    (async () => {
        const url = "https://api.openai.com/v1/engines/text-curie-001/completions";
        const params = {
            "prompt": prompt,
            "max_tokens": 64,
            "temperature": 0.7,
            "frequency_penalty": 0.5
        };
        const headers = {
            'Authorization': `Bearer ${process.env.OPENAI_API}`,
        };

        try {
            const answer = await got.post(url, { json: params, headers: headers }).json();
            output = `${answer.choices[0].text}`;
            console.log(output);

            // Return the response to the client side
            response.json({
                status: "congrat",
                prompt: request.body.prompt,
                output: output
            });
        } catch (err) {
            console.log(err);
        }
    })();
  })