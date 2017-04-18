/**
 * Class to represent a parking space
 */

export class ParkingSpace{

    public id: string;
    public userid: string;    
    public active: boolean;
    public title: string;
    public description: string;

    public address1: string;
    public address2: string;
    public city: string;
    public postcode: string;
    
    public featured_image: string;
    public pictures: Array<string>;
    
    public created: number;
    public updated: number;
}