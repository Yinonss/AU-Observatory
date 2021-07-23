var RuleEngine = require('node-rules')

var R = new RuleEngine();

/* Sample Rule to block a transaction if its below 500 */
var rule = {
    "condition": function(R) {
        R.when(this.name === "");
    },
    "consequence": function(R) {
        this.result = false;
        this.reason = "the name is empty";
        R.stop();
    }
};
/* Creating Rule Engine instance and registering rule */


R.register(rule);
/* Fact with less than 500 as transaction, and this should be blocked */
var fact = {
    "name": "",
    "application": "MOB2",
    "transactionTotal": 400,
    "cardType": "Credit Card"
};

R.execute(fact, function(data) {
    if (data.result) {
        console.log("Valid transaction");
    } else {
        console.log("Blocked Reason:" + data.reason);
    }
});