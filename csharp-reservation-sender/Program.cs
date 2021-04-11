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
            var running = true;
            var newTextOnScreen = true;
            var factory = new ConnectionFactory() { HostName = "localhost" };
            Console.WriteLine("[Reservation-system]");
            while (running)
            {
                if(newTextOnScreen)
                {
                    Console.WriteLine(" [ENTER]  Create Reservation");
                    Console.WriteLine(" [ESC]    Exit Program");
                }


                var keyInput = Console.ReadKey(true);

                switch(keyInput.Key)
                {
                    case ConsoleKey.Enter: 
                    {
                        CreateReservation(factory);
                        newTextOnScreen = true;
                        break;
                    }
                    case ConsoleKey.Escape:
                    {
                        running = false;
                        break;
                    }
                    default:
                        newTextOnScreen = false;
                        break;
                }
            }
        }

        private static void CreateReservation(ConnectionFactory factory)
        {
            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                channel.QueueDeclare(queue: "reservations",
                                     durable: false,
                                     exclusive: false,
                                     autoDelete: false,
                                     arguments: null);

                var reservationDetails = GetReservationDetailsFromUser();

                if (reservationDetails == null)
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
        }

        private static ReservationDetails GetReservationDetailsFromUser()
        {
            Console.Write("HotelId: ");
            var hotelId = Console.ReadLine();

            Console.Write("RoomNumber: ");
            int roomNumber;
            var validRoomNumber = Int32.TryParse(Console.ReadLine(), out roomNumber);

            if (!validRoomNumber)
            {
                return null;
            }

            Console.Write("Email: ");
            var email = Console.ReadLine();

            return new ReservationDetails(hotelId, roomNumber, email);
        }
    }
}
