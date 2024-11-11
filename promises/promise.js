
   //promisses
// fetch('https://fakestoreapi.com/products/1')
// .then(res=>res.json())
// .then(json=>console.log(json))
// .catch("something went wrong");

//async/await

async function asyncFun(){
    try{
        let res = await fetch('https://fakestoreapi.com/products/1')
        console.log(res);

        const data = await res.json();
        console.log(data);

    }
    catch(err){
        console.log("something went wrong");
    }
}