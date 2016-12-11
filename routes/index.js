var express = require('express');
var router = express.Router();
var bluebird = require('bluebird')
var Marketcloud = require('marketcloud-node');

/* GET home page. */
router.get('/', function(req, res, next) {
	var marketcloud = new Marketcloud.Client({
		"public_key" : "d7b60aec-4efa-4537-9424-58f535cac0f0",
		"secret_key" : "XMWgnLr9vau2BzdyewxJQDqLtU49/wbhgL1Mex8Zj74="
	})


	marketcloud.products.list({})
		.then(function(products){
			var productPreviews = products.map((product) => {
				if(product.images[0]) {
					var cover = product.images[0]
					product.cover = cover
					return product
				}
				else {
					return product	
				}
				
			})
		  // Handle success
		  res.render('index', { title: 'Elegant Japan', products: productPreviews, err: null });
		})
		.catch(function(error){
		  // Handle the error
		  res.render('index', { title: 'Elegant Japan', products: [], err: error });
		})
});

module.exports = router;
