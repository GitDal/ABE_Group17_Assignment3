using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using Newtonsoft.Json;
using csharp_confirmation_receiver.Models;
using System.Text;

namespace csharp_confirmation_receiver
{
    class Program
    {
        static void Main(string[] args)
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };
            using (var connection = factory.CreateConnection())
            {
                using (var channel = connection.CreateModel())
                {
                    channel.QueueDeclare(queue: "confirms",
                                         durable: false,
                                         exclusive: false,
                                         autoDelete: false,
                                         arguments: null);
                    var consumer = new EventingBasicConsumer(channel);
                    consumer.Received += (model, ea) =>
                    {
                        //Handle received confirmation-message
                        try
                        {
                            var body = ea.Body.ToArray();
                            var jsonMessage = Encoding.UTF8.GetString(body);
                            var confirmation = JsonConvert.DeserializeObject<ReservationConfirmation>(jsonMessage);

                            var isSuccessMessage = confirmation.successfullyReserved ? $"reserved successfully.\nSending Email to {confirmation.email}" : "couldn't be reserved.";
                            Console.WriteLine($" [X] Reservation for room {confirmation.roomNumber} at hotel {confirmation.hotelName} {isSuccessMessage}");
                        }
                        catch(Exception e)
                        {
                            Console.WriteLine(e.ToString());
                        }        
                    };
                    channel.BasicConsume(queue: "confirms",
                                         autoAck: true,
                                         consumer: consumer);

                    Console.WriteLine(" Press [enter] to exit.");
                    Console.ReadLine();
                }
            }
        }
    }
}
