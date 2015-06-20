var braintree = require('braintree');

module.exports = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "jch39p79v52kzh7w",
  publicKey: "fzkwgcj7kr2dpt9v",
  privateKey: "57b4556b4f7b19bc7417b776636a15fb"
});
