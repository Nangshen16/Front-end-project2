//const Shoppingcart = require("../api/models/Shoppingcart")
const $addIngredientsButton = $('.ingredientsControl button')
const $addShoppingcartsButton = $('.ShoppingControl button')
const URL= "https://project2rachel.herokuapp.com/"

const $ul = $(`<ul>`)

const placeholderIngredient = "5f29cbe718237523c3130623"
let cartName = "NSH"


const deleteCart = async(id) => {
    const deleteCart = await fetch(`${URL}/shoppingcart/${id}`,{method:"DELETE"})
    
}
const getShoppingcarts = async() => {
    const data = await fetch (`${URL}/shoppingcart`);
    const response = await data.json();

    console.log(response);

    response.forEach((cart)=> {
        let cartTotal = 0
        $div = $(`<div>`)
        $name= $(`<h1>`).text(cart.name)
        $ingredients = $("<div>");
        cart.ingredients.forEach((ingredient) => {
            $ingredientName = $("<p>").text(ingredient.Name);
            $ingredientPrice = $(`<p>`).text(ingredient.Price)
            $ingredients.append($ingredientName, $ingredientPrice);
            cartTotal += ingredient.Price
        });
        $total = $(`<p>`).text(cartTotal)
        const id = cart._id
        $deleteButton = $(`<button>`).text(`Delete Cart`).on(`click`,()=> deleteCart(id));
        $div.append($name,$ingredients, $total, $deleteButton);

        $(`#carts_container`).append($div);
    });
};
getShoppingcarts();






const getIngredients = async() => {
    const data = await fetch(`${URL}/grocery`);
    console.log(data)
    const response = await data.json()

    console.log(response)

    response.forEach(ingredient => {
        $div = $(`<div>`)
        $name = $(`<p>`).text(ingredient.Name)
        $price = $(`<p>`).text(ingredient.Price)
        
        const id = ingredient._id
        console.log(id)
        
        $input = $(`<input>`).attr("placeholder", `Cart Name`).attr(`id`, id).on("change", ()=> saveCart(id));
        $addButton = $(`<button>`).text(`Add to Cart`).on("click",() => addIngredients(cartName,id ));
        $div.append($name,$price,$addButton,$input);

        $(`#ingredients_container`).append($div);
    });
    };




        //$input = $(`<input>`).attr("placeholder",`Cart Name`)
         //$div.append($name,$price,$addButton,$input)
         

       
        //$(`#ingredients_container`).append($div)
    //})
//}
getIngredients()
getShoppingcarts()
//$addIngredientsButton.on('click',getIngredients)
const saveCart = (id) => {
    cartName = $(`#${id}`).val()
};

//give the function the name of the cart and ingredient ObjectId  I want to add to cart
const addIngredients = async(cartName, ingredient) => {
    //use fetch with PUT method to update the cart
    console.log(`addingredients`,cartName,ingredient)
    const data = await fetch (`${URL}/shoppingcart/${cartName}`, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify([ingredient])
    });
};

 //createCartForm ,input , button
 


//create a new cart
const createNewCart  = async () => {
    const NewCart = {
        name :$(`#nameInput`).val()
    
    }
    const response = await fetch (URL + `/`,
    {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(NewCart)
    })
    console.log(response)
    
}
$("#addcarts").click(createNewCart)


