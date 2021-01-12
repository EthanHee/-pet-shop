App = {
  web3Provider: null,
  contracts: {},

  init: async function () {
    // Load pets.
    $.getJSON('../pets.json', function (data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');
      console.log('petTemplate', petTemplate);


      for (i = 0; i < data.length; i++) {

        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);
        petTemplate.find('.btn-abort-adopt').attr('data-id', data[i].id);


        petsRow.append(petTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function () {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545'); //Ganache
      // App.web3Provider = new Web3.providers.HttpProvider('http://localhost:9545'); //Truffle Develop
      // App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545'); //Ganache CLI
      /*
      Ganache
      Truffle Develop
      Ganache CLI
      这个三种使用方式都要MetaMask配合，在MetaMask中，输入“New RPC URL”时，输入http：//127.0.0.1:8545（Ganache CLI） 可以脱离metamask使用吗？
      */

    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function () {
    // 加载Adoption.json，保存了Adoption的ABI（接口说明）信息及部署后的网络(地址)信息，它在编译合约的时候生成ABI，在部署的时候追加网络信息
    $.getJSON('Adoption.json', function (data) {
      // 用Adoption.json数据创建一个可交互的TruffleContract合约实例。
      var AdoptionArtifact = data;
      App.contracts.Adoption = TruffleContract(AdoptionArtifact);

      // Set the provider for our contract
      App.contracts.Adoption.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the adopted pets
      return App.markAdopted();
    });
    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
    $(document).on('click', '.btn-abort-adopt', App.handleAbortAdopt);
  },

  markAdopted: function () {
    var adoptionInstance;

    App.contracts.Adoption.deployed().then(function (instance) {
      adoptionInstance = instance;

      // 调用合约的getAdopters(), 用call读取信息不用消耗gas
      return adoptionInstance.getAdopters.call();
    }).then(function (adopters) {
      for (i = 0; i < adopters.length; i++) {
        if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-pet').eq(i).find('.btn-adopt').text('Success').attr('disabled', true);
          $('.panel-pet').eq(i).find('.btn-abort-adopt').text('test').attr('disabled', false);
          //  $('.panel-pet').eq(i).find('button').text('test').attr('disabled', true);
          //  document.querySelectorAll('.btn-abort-adopt')[i].innerText = adopters[i]
          //  document.querySelectorAll('.btn-abort-adopt')[i].text('test').attr('disabled', true);



          document.querySelectorAll('.pet-breed—owner')[i].innerText = adopters[i]

        }
        else {
          document.querySelectorAll('.pet-breed—owner')[i].innerText = "NULL"
        }
      }
    }).catch(function (err) {
      console.log(err.message);
    });
  },

  handleAdopt: function (event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));
    console.log(petId);

    var adoptionInstance;

    // 获取用户账号
    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Adoption.deployed().then(function (instance) {
        adoptionInstance = instance;

        // 发送交易领养宠物
        return adoptionInstance.adopt(petId, { from: account });
      }).then(function (result) {
        return App.markAdopted();
      }).catch(function (err) {
        console.log(err.message);
      });
    });
  },


  handleAbortAdopt: function (event) {

    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));
    console.log(petId);

    var adoptionInstance;

    // 获取用户账号
    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Adoption.deployed().then(function (instance) {
        adoptionInstance = instance;

        // 发送交易领养宠物
        return adoptionInstance.abortAdopt(petId, { from: account });
      }).then(function (result) {
        return App.markAdopted();
      }).catch(function (err) {
        console.log(err.message);
      });
    });
  }

};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
