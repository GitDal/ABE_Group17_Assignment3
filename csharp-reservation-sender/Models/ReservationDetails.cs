// { hotelId: reservationDetails.hotelId, roomNumber: reservationDetails.roomNumber, email: reservationDetails.email };

namespace csharp_reservation_sender.Models
{
    public class ReservationDetails
    {
        public ReservationDetails(string hotelId, int roomNumber, string email)
        {
            this.hotelId = hotelId;
            this.roomNumber = roomNumber;
            this.email = email;
        }
        
        public override string ToString()
        {
            return $"ReservationDetails: (hotelId: {hotelId}, roomNumber: {roomNumber}, email: {email})";
        }

        public string hotelId { get; set; }
        public int roomNumber { get; set; }
        public string email { get; set; }
    }
}