// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Adoption {
    address[16] public adopters; // 保存领养者的地址

    //   mapping(uint256 => address) alladopters; // 所有的领养者

    // 领养宠物
    function adopt(uint256 petId) public returns (uint256) {
        require(petId >= 0 && petId <= 15); // 确保id在数组长度内

        adopters[petId] = msg.sender; // 保存调用这地址
        //alladopters[petId] = msg.sender;
        return petId;
    }

    // 放弃已经领养的宠物
    function abortAdopt(uint256 petId) public returns (uint256) {
        require(petId >= 0 && petId <= 15); // 确保id在数组长度内
        require(adopters[petId] == msg.sender);

        adopters[petId] = address(0); // 保存调用这地址
        //  alladopters[petId] = address(0);
        return petId;
    }

    // 返回领养者
    function getAdopters() public view returns (address[16] memory) {
        return adopters;
    }

    // function getAdopter(uint256 petId) public view returns (string memory) {
    //     return addressToString(adopters[petId]);
    // }

    // function toBytes2(uint256 x) public payable returns (bytes memory c) {
    //     bytes32 b = bytes32(x);
    //     c = new bytes(32);
    //     for (uint256 i = 0; i < 32; i++) {
    //         c[i] = b[i];
    //     }
    // }

    // function addressToString(address _pool)
    //     public
    //     pure
    //     returns (string memory _uintAsString)
    // {
    //     uint256 _i = uint256(_pool);
    //     if (_i == 0) {
    //         return "0";
    //     }
    //     uint256 j = _i;
    //     uint256 len;
    //     while (j != 0) {
    //         len++;
    //         j /= 10;
    //     }
    //     bytes memory bstr = new bytes(len);
    //     uint256 k = len - 1;
    //     while (_i != 0) {
    //         bstr[k--] = bytes1(uint8(48 + (_i % 10)));
    //         _i /= 10;
    //     }
    //     return string(bstr);
    // }

    // function StringToBytesVer1(string memory source)
    //     public
    //     payable
    //     returns (bytes memory result)
    // {
    //     return bytes(source);
    // }

    // function getAllAdopters() public view returns (string memory) {
    //     string memory alladopterstr = "";
    //     for (uint256 k = 0; k < 16; k++) {
    //         if (alladopters[k] != address(0)) {
    //             // alladopterstr += string(k) + alladopters[k];
    //             string memory addressstr = addressToString(alladopters[k]);
    //             bytes memory _str1ToBytes = toBytes2(k);
    //             bytes memory _str2ToBytes = StringToBytesVer1(addressstr);
    //             string memory ret = new string(
    //                 _str1ToBytes.length + _str2ToBytes.length
    //             );
    //             bytes memory retTobytes = bytes(ret);
    //             uint256 index = 0;
    //             for (uint256 i = 0; i < _str1ToBytes.length; i++)
    //                 retTobytes[index++] = _str1ToBytes[i];
    //             for (uint256 i = 0; i < _str2ToBytes.length; i++)
    //                 retTobytes[index++] = _str2ToBytes[i];
    //             alladopterstr = string(retTobytes);
    //         }
    //     }

    //     return alladopterstr;
    // }
}
