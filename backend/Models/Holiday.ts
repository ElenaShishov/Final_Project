class Holiday {
    public holidayCode: number;
    public holidayDestination: string;
    public holidayDescription: string;
    public holidayStartDate?: Date;
    public holidayEndDate?: Date;
    public price: number;
    public holidayImage: string;
    
    constructor(
       holidayCode: number,
       holidayDestination: string,
       holidayDescription: string,
       holidayStartDate: Date,
       holidayEndDate: Date,
       price: number,
       holidayImage: string,
    ) {
        this.holidayCode = holidayCode;
        this.holidayDestination = holidayDestination;
        this.holidayDescription = holidayDescription;
        this.holidayStartDate = holidayStartDate;
        this.holidayEndDate = holidayEndDate;
        this.price = price;
        this.holidayImage = holidayImage;
    }
  }
  export default Holiday;
  