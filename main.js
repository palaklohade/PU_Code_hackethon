// const fetch = require('node-fetch');

// const API_URL = "https://api.openai.com/v1/chat/completions";
// const API_KEY = "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";

// function open(userInput, memberData) = > {
//     try {
//         const response : await fetch(API_URL, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": Bearer ${API_KEY},
//             },
//             body: JSON.stringify({
//                 model: "gpt-3.5-turbo",
//                 messages: {
//                     "role": "system",
//                     "content": `You are a business chatbot, that helps product manager to assign tasks to their employees within few seconds. You will have a ${userInput} for task description and a ${memberData} of employees details which consists of employees name and expertise. You will have to segregate tasks according to the employees expertise and assign it to them. You have to use this data set and fill these details and print out only in json don't print out in any other text I will be using json only. `
//                 },
//             }),
//         });

//         if (!response.ok) {
//             throw new Error(Failed to call OpenAI API: ${response.statusText});
//         }

//         const data = await response.json();
//         console.log("OpenAI API Response:", data); // Log the response
//         return data;
//     } catch (error) {
//         console.error('Error calling OpenAI API:', error);
//         throw error;
//     }
// };