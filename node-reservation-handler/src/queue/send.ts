import amqp from "amqplib"

async function sender(queueName: string, msg: string) {
    try {
        const connection = await amqp.connect("amqp://localhost");
        const channel = await connection.createChannel();

        channel.assertQueue(queueName, {
            durable: false
        });

        const result = channel.sendToQueue(queueName, Buffer.from(msg));
        console.log(`[x] Sent ${msg}`);

        setTimeout(async () => {
            await connection.close();
        }, 500
        );

    } catch (error) {
        console.log(error);
    }

}

export default sender;