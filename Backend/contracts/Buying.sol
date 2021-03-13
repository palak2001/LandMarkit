

pragma solidity ^0.5.0;

contract Buying {

   enum Status { NotExist, Pending, Approved, Rejected }
	enum userStatus { NotExist, Pending, Approved }

   string  public name = "CHIPS";
    string  public symbol = "CHP";
    string  public standard = "CHIPS v1.0";
    
    uint256 private totalSupply;
    uint256 public tokenPrice;
    uint256 public etherAmount;
    address payable owner;

struct PropertyDetail {
    string name;
    // address currOwner;
    uint CNIC;
    uint size;
    uint value;
    string regDate;
}

struct UserDetail {
        userStatus status;
        string name;
        // address add;
        uint CNIC;
        uint Phone;
}
 
// address to balance
    mapping (address => uint256) public balanceOf;
    
    // pot to balance
    mapping (string => uint256) public balanceOfPot;
// Dictionary of all the properties, mapped using their { propertyId: PropertyDetail } pair.
mapping(uint => PropertyDetail) public properties;
mapping(uint => UserDetail) public propOwnerChange;
    mapping(uint => UserDetail) public userslist;
    mapping(uint => int) public users;
    mapping(uint => bool) public verifiedUsers;

    uint256 public count;
    
    event Transfered(
        address indexed _from,
        address _to,
        uint256 _numberOfTokens
    );
    
    event TransferedToPot(
        address indexed _from,
        string _to,
        string _clientId,
        string _viaEvent,
        uint256 _numberOfTokens
    );
   
    constructor (uint256 initialSupply,uint256 pricePerToken) public {
        owner = msg.sender;
        totalSupply = initialSupply;
        balanceOf[owner] = totalSupply;
        tokenPrice = pricePerToken;
    }

    modifier onlyOwner(uint _propId) {
// require(properties[_propId].CNIC == msg.sender);
_;
}
modifier verifiedUser(uint _cnic) {
   require(verifiedUsers[_cnic]);
   _;
}

// Create a new Property.
event property_created (
uint propId,string name, uint cnic, uint size,uint value, string date
);

function multiply(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x);
    }
    
    function buyTokens(uint256 numberOfTokens) public payable returns (bool){
        
        require(msg.value == multiply(numberOfTokens, tokenPrice),"Insufficient ether for required amount of tokens");
        
        require(balanceOf[owner] > numberOfTokens,"Insufficient Liquidity for this token");

        balanceOf[owner] -= numberOfTokens;

        balanceOf[msg.sender] += numberOfTokens;    
        
        etherAmount += msg.value;

        return true;
    }

    function transfer(string memory pot, uint256 numberOfTokens,string memory clientId,string memory viaEvent) public returns (bool){
        
        require(balanceOf[msg.sender] >= numberOfTokens,"Insufficient balance");

        balanceOf[msg.sender] -= numberOfTokens;
    
        balanceOfPot[pot] += numberOfTokens;

        emit TransferedToPot(msg.sender, pot,clientId,viaEvent,numberOfTokens);

        return true;
    }


   function myTransfer(address from, address to, uint256 amt) public returns (bool){
      balanceOf[from] = balanceOf[from]-amt;
      balanceOf[to] = balanceOf[to] + amt;
      return true;
   }
    
    function winnerTransfer(string memory pot,address to) public returns (bool){
        
        uint256 numberOfTokens=balanceOfPot[pot];
        
        balanceOfPot[pot]-=numberOfTokens;
        
        balanceOf[to]+=numberOfTokens;

        return true;
    }

    function winnerTransferTie(string memory pot,address to1,address to2) public returns (bool){
        
        uint256 numberOfTokens=balanceOfPot[pot]/2;
        
        balanceOfPot[pot]-=numberOfTokens;
        
        balanceOf[to1]+=numberOfTokens;

        balanceOfPot[pot]-=numberOfTokens;
        
        balanceOf[to2]+=numberOfTokens;
        
        return true;
    }

    function getBalance() public view returns (uint256) {
        return balanceOf[msg.sender];
    }

    function getBalanceOther(address id) public view returns (uint256) {
        return balanceOf[id];
    }
    
    function getBalancePot(string memory id) public view returns (uint256) {
        return balanceOfPot[id];
    }
    
    function getContractBalance() public view returns (uint256) {
        return etherAmount;
    }
    
    function sendContractAmountToOwner() public payable {
        require(msg.sender == owner);
        owner.transfer(address(this).balance);
    }


function createProperty(uint _propId, uint _cnic, uint _size, uint _value, string memory _regDate)
public verifiedUser(_cnic) returns (bool) {
string memory name = userslist[_cnic].name;
// uint cnic = userslist[_currOwner].CNIC;
properties[_propId] = PropertyDetail(name,  _cnic, _size, _value, _regDate);
emit property_created(_propId, name, _cnic, _size, _value, _regDate);
return true;
}

event Ownership_changed_requested (
   uint indexed propId,
uint to,
string name
);

// Request Change of Ownership.
function changeOwnership(uint _propId, uint _NewCnic)public verifiedUser(_NewCnic) returns (bool) {
require(properties[_propId].CNIC != _NewCnic);
require(propOwnerChange[_propId].CNIC == 0);
propOwnerChange[_propId].CNIC = _NewCnic;
propOwnerChange[_propId].name = userslist[_NewCnic].name;
// propOwnerChange[_propId].CNIC = userslist[_newOwner].CNIC;
emit Ownership_changed_requested(_propId, _NewCnic, propOwnerChange[_propId].name);
return true;
}

event Ownership_changed (
uint from,
string fromName,
uint to,
string toName,
uint indexed propId

);

// Approve chage in Onwership.
function approveChangeOwnership(uint _propId) public returns (bool) {
   require(propOwnerChange[_propId].CNIC != 0);

   uint from = properties[_propId].CNIC;
   string memory fromName = properties[_propId].name;
 //  uint fromCnic = properties[_propId].CNIC;
    //key
   properties[_propId].CNIC = propOwnerChange[_propId].CNIC;
   properties[_propId].name = propOwnerChange[_propId].name;

   uint to = propOwnerChange[_propId].CNIC;
   string memory toName = propOwnerChange[_propId].name;
//   uint toCnic = propOwnerChange[_propId].CNIC;
   
   propOwnerChange[_propId].CNIC = 0;
   emit Ownership_changed(from, fromName, to, toName, _propId );
   return true;
}

    function rejectChangeOwnership(uint _propId)public returns (bool) {
propOwnerChange[_propId].CNIC = 0 ;

}

    function changeValue(uint _propId, uint _newValue)public returns (bool) {
        require(propOwnerChange[_propId].CNIC == 0);
        properties[_propId].value = _newValue;
        return true;
    }

// Get the property details.
function getPropertyDetails(uint _propId)public view returns (string memory, uint, uint, uint, string memory) {
return (properties[_propId].name, properties[_propId].CNIC, properties[_propId].size, properties[_propId].value, properties[_propId].regDate);
}

// Get the user details.
function getUserDetails(uint _cnic)public view returns (string memory, uint, uint, userStatus) {
return (userslist[_cnic].name, userslist[_cnic].CNIC,
userslist[_cnic].Phone, userslist[_cnic].status);
}

event user (
       userStatus,
string name,
uint CNIC,
uint Phone
);


// Add new user.
function addNewUser(string memory _name, uint _CNIC, uint _Phone)public returns (bool) {
   require(users[_CNIC] == 0);
   require(verifiedUsers[_CNIC] == false);
   users[_CNIC] = 1;
   userslist[_CNIC] = UserDetail(userStatus.Pending ,_name, _CNIC, _Phone);
   emit user(userStatus.Pending ,_name, _CNIC, _Phone);
   return true;
}

// Approve User.
function approveUsers(uint _CNIC)public returns(bool){
   require(users[_CNIC] != 0);
   verifiedUsers[_CNIC] = true;
   return true;
}

}
