import hotelModel, { IHotel } from "./hotel";

export async function populateDb() {
    const address = "Stardew Valley";
    const hotelManagerId = "Mayor Lewis";
    const name = "Pelican Hotel";

    const Hotel: IHotel = {
        address: address,
        hotelManagerId: hotelManagerId,
        name: name,
        rooms: [
            {
                available: true,
                balcony: true,
                beds: 2,
                number: 1,
                size: 15,
            },
            {
                available: true,
                balcony: false,
                beds: 1,
                number: 2,
                size: 7,
            },
            {
                available: true,
                balcony: true,
                beds: 2,
                number: 3,
                size: 15,
            },
            {
                available: true,
                balcony: false,
                beds: 1,
                number: 4,
                size: 7,
            },
            {
                available: true,
                balcony: true,
                beds: 2,
                number: 5,
                size: 15,
            },
            {
                available: true,
                balcony: false,
                beds: 1,
                number: 6,
                size: 7,
            },
        ]
    };

    const result = await hotelModel.findOne({ name: name });
    if(!result){
        console.log("Populating db with test hotel");
        const hotelResult = await hotelModel.create(Hotel);
        console.log(`Hotel: ${name} with id: ${hotelResult.id} created`);
    }
}