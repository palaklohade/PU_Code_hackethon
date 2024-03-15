const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // Import body-parser module
const { Client } = require("@notionhq/client")


const fetch = require('node-fetch');

const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = "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";

const app = express();
const port = 5000;
const notion = new Client({
    auth: "secret_gqGwAywvqtWzkdyd9gED0wNOFWTvqTlkqUaWX6S0kHo",
});


// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());


// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Route handler for the root '/' endpoint
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit-form',async (req, res) => {
    const formData = req.body; // Access form data submitted from HTML form
    console.log('Form submitted:', formData);

    var listOfMemberData = [];
    var employees = [];

    // Iterate over the keys of formData object
    for (var fieldName in formData) {
        var fieldValue = formData[fieldName];

        if (fieldName.includes("employeeName")) {
            var index = fieldName.match(/\d+/)[0];
            var employeeIndex = parseInt(index);
            if (!employees[employeeIndex]) {
                employees[employeeIndex] = {};
            }
            employees[employeeIndex].name = fieldValue;
        } else if (fieldName.includes("employeeExpertise")) {
            var index = fieldName.match(/\d+/)[0];
            var employeeIndex = parseInt(index);
            if (!employees[employeeIndex]) {
                employees[employeeIndex] = {};
            }
            employees[employeeIndex].expertise = fieldValue;
        }
    }
    console.log(employees);

    for (var i = 0; i < employees.length; i++) {
        if (employees[i]) { // Check if the element exists
            listOfMemberData.push({
                Name: employees[i].name,
                description: employees[i].expertise,
                Due_date:new Date().toISOString(),
                status: "InProgress"
                // Add additional fields if needed
            });
        }
    }
    console.log(listOfMemberData);

  await  alertMe(listOfMemberData)
    // Perform actions with form data as needed
    res.send('Form submitted successfully!');
});



app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});





console.log("till this?")
const sleep = (milliseconds) => {
return new Promise(resolve => setTimeout(resolve, milliseconds));
};
// app.get('/', (req, res) => {
// res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });


// Sample member data
const aiArray = [];
// const aiData = {
// "name": "name",
// "description": "description",
// "Due_date": "Due_date",
// // };
// console.log(`Fetched ${aiData.name}.`);
// console.log(`Fetched ${aiData.description}.`);
// console.log(`Fetched ${aiData.Due_date}.`);

// aiArray.push(aiData);
// aiArray.push(aiData);
// aiArray.push(aiData);








async function alertMe(employees) {






console.log(employees)
await createNotionPagesForAllMembers(employees)

}





async function createNotionPagesForMember(member) {
try{
    console.log("lookforThis")
    console.log(member)
    const data = {
        parent: {
            type: "database_id",
            database_id: "536af542c8544d778ffc5bee4e1977c2", // Replace with your Notion database ID
        },
        properties: {
            Name: {
                title: [
                    {
                        text: {
                            content: member.Name,
                        },
                        "annotations": {
                            "bold": true,
                            "italic": true,
                            "strikethrough": false,
                            "underline": false,
                            "code": false,
                            "color": "gray"
                        },
                        "plain_text": "Bug bash",
                        "href": null
                    },
                ],
            },
            "description": {
                rich_text: [
                    {
                        text: {
                            content: member.description,
                        },
                    },
                ],
            },
            "Due_date": {
                "id": "M%3BBw",
                "type": "date",
                "date": {
                    "start": member.Due_date,
                    "end": null,
                    "time_zone": null
                }
            },
        },
        "cover": null,
        "icon": {
            "type": "emoji",
            "emoji": "🐸"
        },
        "Status": {
            "id": "Z%3ClH",
            "type": "status",
            "status": {
                "id": "86ddb6ec-0627-47f8-800d-b65afd28be13",
                "name": member.status,
                "color": "default"
            }
        }
    };

try {
console.log("working now")

console.log("working now2")

const response = await notion.pages.create(data);
console.log(`Created Notion page for ${member.name}`);
console.log(response);
} catch (error) {
console.error('Error creating Notion page:', error);
}
}
catch (error) {
console.error('Error creating Notion page:', error);
}

}




async function createNotionPagesForAllMembers(memberData) {


console.log("working")
console.log(memberData[0].name)


for (const member of memberData) {
await createNotionPagesForMember(member);
await sleep(300); // Add a delay between requests to avoid rate limits
}

console.log('Operation complete.');
}





// Function to introduce a delay between requests


module.exports = function giveAlert(){
alert("it might work")
}


// module.exports = {
// notion,
// aiArray,
// aiData,
// alertMe
// };



