
module.exports.addTwoNumbers = function(req,res){
    console.log("Inside add two numbers");

    console.log(req.query);
    num1 = parseInt(req.params.num1);
    let num2 = 0;
    let sum = num1 + num2

    if(req.query && req.query.num2){
        num2 = parseInt(req.query.num2);
        sum = num1 + num2;
    }

    console.log("Result = ", sum);
    res.status(200).send(num1 + " + " + num2 + " = " + sum);

}