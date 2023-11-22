// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

contract Credentials{
    struct Credential{
        string username;
        string password;
    }

    struct admin_Credential{
        string username;
        string password;
        int id;
    }
    Credential[] public c;
    admin_Credential[] public ac;

    function addCredentials(string memory _username,string memory _password) public{
        Credential memory cr=Credential({
            username:_username,
            password:_password
        });
        c.push(cr);
    }

    function adminaddCredentials(int id,string memory _username,string memory _password) public{
        admin_Credential memory acr=admin_Credential({
            username:_username,
            password:_password,
            id:id
        });
        ac.push(acr);
    }

    

    function getLength() public view returns(uint){
        return c.length;
    }
    

    function VerifyCredentials(string memory v_username,string memory v_password) public view returns(string memory){
        for(uint i=0;i<c.length;i++){
            if(strcmp(c[i].username,v_username)&&strcmp(c[i].password,v_password)){
                return "true";
            }
        }
        return "false";
    }

    function adminVerifyCredentials(string memory v_username,string memory v_password,int id) public view returns(string memory){
        for(uint i=0;i<ac.length;i++){
            if(strcmp(ac[i].username,v_username)&&strcmp(ac[i].password,v_password)&&(ac[i].id==id)){
                return "true";
            }
        }
        return "false";
    }

    function adminVerifyCredentials(int id,string memory v_username,string memory v_password) public view returns(bool){
        for(uint i=0;i<ac.length;i++){
            if(strcmp(ac[i].username,v_username)&&strcmp(ac[i].password,v_password)&&(id==ac[i].id)){
                return true;
            }
        }
        return false;
    }

    function deleteAccount(string memory username,string memory password) public{
        for(uint i=0;i<c.length;i++){
            if(strcmp(c[i].username,username)&&strcmp(c[i].password,password)){
                delete c[i];
                
            }
        }
        
    }
    function admindeleteAccount(int id,string memory username,string memory password) public{
        for(uint i=0;i<ac.length;i++){
            if(strcmp(ac[i].username,username)&&strcmp(ac[i].password,password)&&(ac[i].id==id)){
                delete ac[i];
            }
        }
        
    }

    function memcmp(bytes memory a, bytes memory b) internal pure returns(bool){
        return (a.length == b.length) && (keccak256(a) == keccak256(b));
    }

     function strcmp(string memory a, string memory b) internal pure returns(bool){
        return memcmp(bytes(a), bytes(b));
    }

}


