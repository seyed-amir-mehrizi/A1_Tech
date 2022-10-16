
export interface Car {
    color: string,
    fuelType: string,
    manufacturerName: string,
    mileage: {
        number: number,
        unit: string
    },
    modelName: string,
    pictureUrl: string,
    stockNumber: number
}