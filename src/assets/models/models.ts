
export type Car = {
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

export type CarProps = {
    car: {
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
}


export type CarListingProps = {
    cars: {
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
    }[]
}

export type PaginationProps = {
    currentPage: number,
    total: number,
    limit: number,
    onPageChange: (e: number) => void
}

export type SelectItemProps = {
    label: string,
    id: string,
    placeholder: string,
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    data: any[],
    name?: string
}

export type AppAlertProps = {
    className: string,
    message: string

}





