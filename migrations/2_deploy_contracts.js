var Adoption = artifacts.require("Adoption");

module.exports = function (deployer) {
    // console.log(network);
    deployer.deploy(Adoption);
};