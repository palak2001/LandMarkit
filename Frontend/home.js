var desks = [
    {"111111":["1","2","3","4","5"]}, 
    {"224322":["6","7","13","14","0"]}, 
    {"133534":["12","11","8","10","9"]}
    ];

var details = new Map();

class PropertyDetail {

    constructor(propId,name,CNIC,size,value,regDate,isAvailable){
        this.propId = propId;
        this.name = name;
        this.CNIC = CNIC;
        this.size = size;
        this.value = value;
        this.regDate = regDate;
        this.isAvailable = isAvailable;
    }

    // Get the property details.
     async getPropertyDetails(_propId){
        alert((details[_propId].name+details[_propId].CNIC+details[_propId].size+details[_propId].value+details[_propId].regDate));
     }

}

details.set('0',(new PropertyDetail("0","ShimlaHouse",1234567890,1234,10000,"10011001",true)));
details.set('1',(new PropertyDetail("1","ShimlaHouse",1234567890,1234,10000,"10011001",true)));
details.set('2',(new PropertyDetail("2","ManaliHouse",1234435590,1424,10500,"10033301",false)));
details.set('3',(new PropertyDetail("3","ShimlaHouse",1234567890,1234,10000,"10011001",true)));
details.set('4',(new PropertyDetail("4","ManaliHouse",1234435590,1424,10500,"10033301",false)));
details.set('5',(new PropertyDetail("5","ShimlaHouse",1234567890,1234,10000,"10011001",false)));
details.set('6',(new PropertyDetail("6","ManaliHouse",1234435590,1424,10500,"10033301",false)));

console.log(details.get('1').name);

var pincodeProperty = ['1','2','3'];

async function getProperties(){
    var pincode = document.getElementById('pincode').value;
    var properties = document.createElement('div');

    for (var i = 0; i < desks[0]; i++)
    {
        console.log(desks[1][i]);
    }

    for(let i in pincodeProperty){
        var property = document.createElement('button');
        property.innerHTML = pincodeProperty[i];
        property.addEventListener('click', function(){new PropertyDetail().getPropertyDetails(pincodeProperty[i])});
        properties.append(property);
        var buy = document.createElement('button');
        buy.innerHTML = "Buy"+pincodeProperty[i];
        buy.addEventListener('click',function(){})
        var canBuy = details.get(pincodeProperty[i]).isAvailable;
        console.log(canBuy);
        if(canBuy==true){
            properties.append(buy);
        }
        console.log("efdgbxfgbf"+i);
    }
    document.getElementById('properties').appendChild(properties);
}


    