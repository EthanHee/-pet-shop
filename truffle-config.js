module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!

  contracts_directory: "./contracts",              //指定合约目录
  contracts_build_directory: "./build/contracts",  //指定合约构建生成目录
  migrations_directory: "./migrations",            //迁移文件目录


  networks: {
    development: {     // truffle console
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    ropsten: {     // truffle console
      host: "192.168.20.229",//
      port: "8545",//
      network_id: "3",// // Match any network id
      from: "0x822531774f9af49f60b4b527d61b647d8d459bbb",
      gasPrice: 100000000000,
      gas: 4712388
    },
    develop: {  // truffle develop
      port: 8545
    }
  },

  /* ... rest of truffle-config */
  plugins: [
    "truffle-plugin-hello"
  ]
};
