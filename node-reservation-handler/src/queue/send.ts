import amqp from "amqplib"

async function sender(queueName: string, msg: string) {
    try {
        const connection = await amqp.connect("amqp://localhost");
        const channel = await connection.createChannel();

        channel.assertQueue(queueName, {
            durable: false
        });

        channel.sendToQueue(queueName, Buffer.from(msg));
        console.log(`[x] Sent ${msg}`);

         setTimeout(() => {
             connection.close();
         //process.exit(0)
         }, 500
         );

    } catch (error) {
        console.log(error);
    }

}

export default sender;