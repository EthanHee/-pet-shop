阅读参考：https://learnblockchain.cn/2018/01/12/first-dapp/


Mac下部署步骤（亲测）：
一、环境搭建
1、安装 Node
2、安装 Truffle ：npm install -g truffle
3、安装 Ganache

二、部署



三、测试
 1、执行 truffle test 时有报错
   address expected = address(this);  需强制转换下 this类型



四、MetaMask
   使用 Ganache 提供的助记词 导入到 MetaMask中,选择 Custom RPC，添加一个网络：http://127.0.0.1:7545, 
   链ID使用的是1337 为什么 不是Ganache 中的 5777 ?
