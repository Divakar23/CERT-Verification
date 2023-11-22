const credentials = artifacts.require("Credentials");

module.exports = function (deployer) {
  deployer.deploy(credentials);
};