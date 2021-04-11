export interface IRoom {
    number: number;
    size: number;
    available: boolean;
    beds: number;
    balcony: boolean;
    reservedByUserId?: string; //user.Email
}

export interface IHotel {
    hotelManagerId: String; //user.Email
    name: string;
    address: string;
    rooms: Array<IRoom>
}