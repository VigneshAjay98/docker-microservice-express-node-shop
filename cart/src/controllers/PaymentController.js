const stripe = require('stripe')(process.env.STRIPE_SECRET)
const AWS = require('aws-sdk')

class PaymentController
{

    static async initiatePayment(req, res) {

        /* Set the credentials */ 
        AWS.config.update({
            apiVersion: "2012-11-05",
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            accessSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION
        })

        /* Create an SQS service object */
        const sqs = new AWS.SQS()

        var queueUrl = process.env.QUEUE_URL
        debugger;
        /* const listQueuesParams = {
            QueueNamePrefix: 'shop-'
        }

        sqs.listQueues(listQueuesParams, function(err, data) {
            if (err) {
                console.log(`*******Error in queues!*******`); 
                console.log(err, err.stack); 
            } 
            console.log(`Existing queueUrls : ${data.QueueUrls}`)
            if(data.QueueUrls.length > 0) {
                console.log(`*******Queues found!*******`);
                queueUrl = data.QueueUrls[0]
            }
            console.log(`queueUrl : ${queueUrl}`)
        }) */

        const newQueueParams = {
            QueueName: 'shop-sqs-orders', 
        }

        if (queueUrl === "") {
            /* Create a new SQS Queue */
            sqs.createQueue(newQueueParams, function(err, data) {
                if (err) console.log(err, err.stack) 
                else {
                    console.log(`*******New Queue created!*******`); 
                    queueUrl = data.QueueUrl
                }              
            })
        }

        let orderData = {
            userEmail: "sqstest1@gmail.com",
            itemName: "testproduct1",
            itemPrice: "3500",
            itemsQuantity: "1"
        }

        const messageParams = {
            // Remove DelaySeconds parameter and value for FIFO queues
            DelaySeconds: 5,
            MessageAttributes: {
                "userEmail": {
                    DataType: "String",
                    StringValue: orderData.userEmail
                },
                "itemName": {
                    DataType: "String",
                    StringValue: orderData.itemName
                },
                "itemPrice": {
                    DataType: "Number",
                    StringValue: orderData.itemPrice
                },
                "itemsQuantity": {
                    DataType: "Number",
                    StringValue: orderData.itemsQuantity
                }
            },
            MessageBody: JSON.stringify(orderData),
            QueueUrl: queueUrl          // "https://sqs.ap-south-1.amazonaws.com/731487254417/shop-sqs-orders"
        }

        try {
            sqs.sendMessage(messageParams, function(err, data) {
                if (err) {
                    console.log(`*******Message failed to add to queue :(*******`)
                    console.log("Error", err);
                    res.send(`*******Message failed to add to queue :(*******`)
                } else {
                    console.log(`*******Message sent to queue successfully!*******`)
                    console.log("Success", data.MessageId);
                    res.redirect('/payment/confirm') // Change this url with nginx APIGateway
                }
            })
        } catch (e) {
            console.log(`*******Something wrong in wuque*******`)
        }
        return
    }

}

module.exports = PaymentController