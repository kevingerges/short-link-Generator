const functions = require("firebase-functions");

const admin = require('firebase-admin');
admin.initializeApp();


// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


exports.addUrl = functions.https.onRequest(async(req, res) => {
    // Grab the text parameter.
    const url = req.query.url;
    // Push the new message into Firestore using the Firebase Admin SDK.
    const writeResult = await admin.firestore().collection('urls').add({ long: url });
    // Send back a message that we've successfully written the message
    res.json({ shortened: `${writeResult.id}` });
});

exports.getUrl = functions.https.onRequest((req, res) => {
    const short = req.query.short;
    admin.firestore().collection("urls").doc(short).get().then(doc => {
        res.json(doc.data())
    })
});