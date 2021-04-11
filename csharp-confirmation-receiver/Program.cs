using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using Newtonsoft.Json;
using csharp_confirmation_receiver.Models;

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
                        var confirmation = JsonConvert.DeserializeObject<ReservationConfirmation>(ea.Body.ToString()); 
                        var isSuccessMessage = confirmation.successfullyReserved ? $"reserved successfully.\nSending Email to {confirmation.email}" : "couldn't be reserved.";
                        Console.WriteLine($" [X] Reservation for room {confirmation.roomNumber} at hotel {confirmation.hotelName} {isSuccessMessage}");
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
