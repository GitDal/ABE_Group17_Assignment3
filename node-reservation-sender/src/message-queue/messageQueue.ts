import amqp from "amqplib";

const rabbitmqConnection = "amqp://localhost";

export async function send(queueName: string, msgString: string) {
    try {
        const connection = await amqp.connect(rabbitmqConnection);
        const channel = await connection.createChannel();

        await channel.assertQueue(queueName, {
            durable: false,
        });

        channel.sendToQueue(queueName, Buffer.from(msgString));
        console.log(`[x] Sent ${msgString}`);

    } catch (error) {
        console.log(error);
    }
}

// export async function receive(queueName: string) {
//     try {
//         const connection = await amqp.connect(rabbitmqConnection);
//         const channel = await connection.createChannel();

//         await channel.assertQueue(queueName, {
//             durable: false,
//         });

//         console.log(`[*] Waiting for messages in ${queueName}. To exit press CTRL+C`);
//         await channel.consume(queueName, (msg) => {
//             const receivedMsg = msg?.content.toString()
//             console.log(`[x] Received ${receivedMsg ? receivedMsg : "empty message"}`);
//         }, { noAck: true, }
//         );

//     } catch (error) {
//         console.log(error);
//     }
// }