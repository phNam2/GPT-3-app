const express = require('express');
require('dotenv').config();
const got = require('got');


// Set up the web port host
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server at ${port}`)); //http://localhost:3000
app.use(express.static('public')); // Local folder for html
app.use(express.json({limit: '1mb'}));



// // Test OPENAI call
// const prompt = `Artist: Megadeth\n\nCareer:\n`;

// (async () => {
//   const url = "https://api.openai.com/v1/engines/text-curie-001/completions";
//   const params = {
//     "prompt": prompt,
//     "max_tokens": 64,
//     "temperature": 0.7,
//     "frequency_penalty": 0.5
//   };
//   const headers = {
//     'Authorization': `Bearer ${process.env.OPENAI_API}`,
//   };

//   try {
//     const response = await got.post(url, { json: params, headers: headers }).json();
//     output = `${prompt}${response.choices[0].text}`;
//     console.log(output);
//   } catch (err) {
//     console.log(err);
//   }
// })();


app.post('/completions', (request, response) => {
    console.log("Got it");
    console.log(request.body);

    response.json({
        status: "congrat",
        prompt: request.body.prompt
    });
  })