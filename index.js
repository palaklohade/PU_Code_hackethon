const readline = require('readline');
const { Client } = require('@notionhq/client');
require('dotenv').config();

const notion = new Client({
    auth: "secret_p8ixPYOQsnftAXxEKXHOn3DgzACGQW51xEmiG1i7O76",
});

// Sample member data
const aiArray = [];
const aiData = {
    "name": "name",
    "description": "description",
    "Due_date": "Due_date",
};
console.log(`Fetched ${aiData.name}.`);
console.log(`Fetched ${aiData.description}.`);
console.log(`Fetched ${aiData.Due_date}.`);

aiArray.push(aiData);
aiArray.push(aiData);
aiArray.push(aiData);

async function createNotionPagesForMember(member) {
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
                            content: member.name,
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
        const response = await notion.pages.create(data);
        console.log(`Created Notion page for ${member.name}`);
        console.log(response);
    } catch (error) {
        console.error('Error creating Notion page:', error);
    }
}

const memberData = [];
document.addEventListener("DOMContentLoaded", function() {
document.getElementById("employeeForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    const numEmployees = document.getElementById("numEmployees").value;

    for (let i = 0; i < numEmployees; i++) {
        const name = document.getElementById(`employeeName${i}`).value;
        const description = document.getElementById(`employeeExpertise${i}`).value;
        const dueDate = new Date().toISOString(); // Example date, replace with actual date from form

        // Push member data to array
        memberData.push({
            name: name,
            description: description,
            Due_date: dueDate,
            status: "In Progress", // Example status, replace with actual status from form
        });
    }
});
    // Create Notion pages for all members
    createNotionPagesForAllMembers(memberData);
});

// Function to create Notion pages for all members
async function createNotionPagesForAllMembers(memberData) {
    for (const member of memberData) {
        await createNotionPagesForMember(member);
        await sleep(300); // Add a delay between requests to avoid rate limits
    }

    console.log('Operation complete.');
}

// Function to introduce a delay between requests
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};
