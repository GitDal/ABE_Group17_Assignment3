using System;
using RabbitMQ.Client;
using Newtonsoft.Json;
using System.Text;
using csharp_reservation_sender.Models;

namespace csharp_reservation_sender
{
    class Program
    {
        static void Main(string[] args)
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };
            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                channel.QueueDeclare(queue: "reservations",
                                     durable: false,
                                     exclusive: false,
                                     autoDelete: false,
                                     arguments: null);


                Console.WriteLine("[Reservation-system]");
                var reservationDetails = GetReservationDetailsFromUser();
                
                if(reservationDetails == null) 
                {
                    Console.WriteLine("Validation-Error : couldn't generate reservation");
                    return;
                }

                var reservationDetailsAsJson = JsonConvert.SerializeObject(reservationDetails);
                var body = Encoding.UTF8.GetBytes(reservationDetailsAsJson);

                channel.BasicPublish(exchange: "",
                                     routingKey: "reservations",
                                     basicProperties: null,
                                     body: body);
                Console.WriteLine($"\n [x] Sent {reservationDetails.ToString()}");
            }

            Console.WriteLine(" Press [enter] to exit.");
            Console.ReadLine();
        }

        private static ReservationDetails GetReservationDetailsFromUser()
        {
            Console.Write("HotelId: ");
            var hotelId = Console.ReadLine();
            
            Console.Write("RoomNumber: ");
            int roomNumber;
            var validRoomNumber = Int32.TryParse(Console.ReadLine(), out roomNumber);
            
            if(!validRoomNumber) 
            {
                return null;
            }

            Console.Write("Email: ");
            var email = Console.ReadLine();

            return new ReservationDetails(hotelId, roomNumber, email);
        }
    }
}
