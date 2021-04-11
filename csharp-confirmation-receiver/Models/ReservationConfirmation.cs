// {hotelName: hotel.name, hotelId: hotelId, roomNumber: roomNumber, email: email, successfullyReserved: true};

namespace csharp_confirmation_receiver.Models
{
    public class ReservationConfirmation 
    {
        public string hotelName {get; set;}
        public string hotelId {get; set;}
        public int roomNumber {get; set;}
        public string email {get; set;}
        public bool successfullyReserved {get; set;}
    }
}

