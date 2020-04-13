export default class Beacon{
    constructor(uuid,lat,long){
        this.uuid=uuid;
        this.lat=lat;
        this.long=long;
        alert(this.uuid + this.lat + this.long)
    }
}