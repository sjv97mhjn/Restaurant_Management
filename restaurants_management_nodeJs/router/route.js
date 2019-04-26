var express = require("express");
var app = express();
var router = express.Router();


router.use("/restaurant" , require("./controllers/restaurant/index"));
router.use("/item" , 	   require("./controllers/item/index"));
router.use("/order" , 	   require("./controllers/order/index"));
router.use("/tax" , 	   require("./controllers/tax/index"));
router.use("/cuisine" ,    require("./controllers/cuisine/index"));
router.use("/" ,    require("./controllers/user/index"));


module.exports = router;