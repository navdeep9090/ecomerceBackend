import twilio from 'twilio';


const accountSid = process.env.TWILIO_ACCOUNT_SID 
const authToken = process.env.TWILIO_AUTH_TOKEN;    
const client = twilio(accountSid, authToken);

export function sendSms(to, messageBody) {
    return client.messages.create({
        body: 'Hello, this is a test message from Node.js using ES Modules!',
        to: "+918941961473",  
        from: '+13342032629' 
    });
}

const customerNumbers = [/* Your customer phone numbers */];

// customerNumbers.forEach(number => {
//     client.messages.create({
//         body: 'Your message content',
//         from: '+1234567890', // Replace with your Twilio phone number
//         to: number
//     })
//     .then(message => console.log(message.sid))
//     .catch(error => console.error(error));
// });
// client.messages.create({
//     body: 'Hello, this is a test message from Node.js using ES Modules!',
//     to: '+1234567890', 
//     from: '+0987654321'
// })
// .then((message) => console.log(`Message sent successfully with SID: ${message.sid}`))
// .catch((error) => console.error(`Failed to send message: ${error.message}`));
