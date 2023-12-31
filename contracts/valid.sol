// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract valid{
    struct certificate{
        string name;
        string id;
        string course_name;
        string organization;
    }

    bytes32 public messageHash;
    bytes32 public messageHash1;
    certificate[] public c;

    mapping(bytes32=>certificate) public verify;
    bytes32[] hash;
    bytes32[] delhash;

    string m1="legit";
    string m2="not legit";

    function addUser(string memory _name,string memory _id,string memory _course_name
    ,string memory _organization) public {
        certificate memory cn=certificate({
            name:_name,
            id:_id,
            course_name:_course_name,
            organization:_organization
        });

        c.push(cn);

        messageHash=keccak256(bytes(abi.encodePacked(_name,_id)));
        hash.push(messageHash);
        verify[messageHash]=cn;
    }

    function validUser(bytes32 check) public view returns (bool){
        for(uint i=0;i<hash.length;i++){
            if(hash[i] == check){
                for(uint j=0;j<delhash.length;j++){
                    if(delhash[j]== check){
                        return false;
                    }
                }

                return true;
            }
        }
        return false;
    }

    function checkUser(string memory _name,string memory _id) public returns (string memory) {
        messageHash1=keccak256(bytes(abi.encodePacked(_name,_id)));
        if(validUser(messageHash1)){
            return m1;
        }
        return m2;
    }

    function deleteUser(string memory _name,string memory _id) public returns (string memory) {
        delete verify[keccak256(bytes(abi.encodePacked(_name,_id)))];
        messageHash=(keccak256(bytes(abi.encodePacked(_name,_id))));
        for(uint i=0;i<hash.length;i++){
            if(hash[i] == messageHash){
                hash[i]=hash[hash.length-1];
                hash.pop();
                delhash.push(messageHash);
                return "deleted";
            }
        }
        return "not deleted";
    }

    function getHash(string memory _id) public view returns (bytes32){
        for(uint i=0;i<c.length;i++){
            if(strcmp(c[i].id,_id)){
                return keccak256(bytes(abi.encodePacked(c[i].name,c[i].id)));
            }
        }
        return 0x0;
    }

    function getName(string memory _id) public view returns(string memory){
        for(uint i=0;i<c.length;i++){
            if(strcmp(c[i].id,_id)){
                return c[i].name;
            }
        }
        return "nope";
    }

    function getCourse(string memory _id) public view returns(string memory){
        for(uint i=0;i<c.length;i++){
            if(strcmp(c[i].id,_id)){
                return c[i].course_name;
            }
        }
        return "nope";
    }

    



    function memcmp(bytes memory a, bytes memory b) internal pure returns(bool){
        return (a.length == b.length) && (keccak256(a) == keccak256(b));
    }

     function strcmp(string memory a, string memory b) internal pure returns(bool){
        return memcmp(bytes(a), bytes(b));
    }

}

