const stripe = require('stripe')(process.env.STRIPE_SECRET)
const { Op } = require('sequelize')
const Order = require('../database/models/Order.js')
const AWS = require('aws-sdk')

class OrderController 
{
    static async receivePayment(req, res) {
        /* Set the credentials */ 
        AWS.config.update({
            apiVersion: "2012-11-05",
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            accessSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION
        })

        // Create an SQS service object
        const sqs = new AWS.SQS()
        var queueUrl = process.env.QUEUE_URL

        const params = {
            AttributeNames: [
                "SentTimestamp"
            ],
            MaxNumberOfMessages: 10,
            MessageAttributeNames: [
                "All"
            ],
            QueueUrl: queueUrl,
            VisibilityTimeout: 20,
            WaitTimeSeconds: 0
        }

        async function transaction() {
            const customers = []
            // const customers = ['cus_LyKwRBSOE2MxqG']
    
            if(customers.includes('cus_LyKwRBSOE2MxqG')) {

                const customer = await stripe.customers.retrieve(
                    customers[0]
                );
                stripe.charges.create({
                    amount: 2500,     // Charing Rs 25
                    description: 'Web Development Product',
                    currency: 'INR',
                    customer: customer.id
                });

                console.log("************Old customer Payment Success************")
            } else {

                const { id:cardToken } = await stripe.tokens.create({
                    card: {
                      number: '4242424242424242',
                      exp_month: 6,
                      exp_year: 2023,
                      cvc: '314',
                    },
                  });

                const customer = stripe.customers.create({
                    email: "test1@gmail.com",
                    source: cardToken,
                    name: 'Test User1',
                    address: {
                        line1: 'TC 9/4 Old MES colony',
                        postal_code: '452331',
                        city: 'Indore',
                        state: 'Madhya Pradesh',
                        country: 'India',
                    }
                })
                .then((customer) => {
            
                    stripe.charges.create({
                        amount: 2500,     // Charing Rs 25
                        description: 'Web Development Product',
                        currency: 'INR',
                        customer: customer.id
                    });
                })
                .then((charge) => {
                    console.log("************New customer Payment Success************")
                })
                .catch((err) => {
                    console.log("************New customer Payment Failed :(************")
                });
            }
        }

        sqs.receiveMessage(params, function(err, data) {
            if (err) {
                console.log("******Receive Error :(******", err);
            } else if (data.Messages) {
                console.log("******Received Message data******", data.Messages);
                
                transaction()
                const deleteParams = {
                    QueueUrl: queueUrl,
                    ReceiptHandle: data.Messages[0].ReceiptHandle
                };
                sqs.deleteMessage(deleteParams, function(err, data) {
                if (err) {
                    console.log("******Delete Error :(******", err);
                } else {
                    console.log("******Message Deleted :(******", data);
                }
                })
            }
        })

        return 
    }

}

module.exports = OrderController