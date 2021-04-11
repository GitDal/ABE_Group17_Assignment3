import amqp, { ConsumeMessage } from "amqplib"

async function receiver(queueName: string, handler: (msg:ConsumeMessage|null) => void) {
    try {
        const connection = await amqp.connect("amqp://localhost");
        const channel = await connection.createChannel();

        channel.assertQueue(queueName, {
            durable: false
        });

        const consume = await channel.consume(queueName, (msg) => {
            handler(msg);

            // Debug:
            const msgAsString = msg?.content.toString();
            console.log(`[x] Received ${msgAsString}`)
        }, {
            noAck: true
        });

    } catch (error) {
        console.log(error);
    }
}

export default receiver;
