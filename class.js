class createMail{
    constructor(to,from,url){
        this.to=to;
        this.from =from;
        this.url=url;
    }
    getSender(){
        return "Sender is "+this.from;
    }
}
var newmail= new createMail(
"abc@gmail.com",
"tush@gmail.com",
"shivchanch.com"
);
// console.log(newmail);
//second way of implementing this
function second(name,properties)
{
    this.Name = name;
    this.features= properties;
    this.getfn= function(){
        console.log("functions can also be declared");
    };
}
var fnobj = new second("Tushar","Best");
console.log(fnobj);
// class newclass{
//     name="Tushar";
//     age = 27;
//     newfunc= ()=>{
//         console.log("Hey "+this.name+" "+this.age);
//     }
// }
// let val = new newclass();
// val.newfunc();