//const Shoppingcart = require("../api/models/Shoppingcart")
const $addIngredientsButton = $('.ingredientsControl button')
const $addShoppingcartsButton = $('.ShoppingControl button')
const URL= "http://localhost:3000"

const $ul = $(`<ul>`)

const placeholderIngredient = "5f29cbe718237523c3130623"
const cartName = "NSH"

const addIngredients = async (cartName,ingredient) => {
    console.log(cartName,ingredient)
  const data = await fetch(`${URL}/shoppingcart/${cartName}`,{
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: ingredient
  }) 
}

addIngredients(cartName,placeholderIngredient)

const getShoppingcarts = async() => {  

    const data = await fetch(`${URL}/shoppingcart`)
       const response = await data.json()
       console.log(response)
        response.forEach(shoppingcart => {
        $shoppingcart = $(`<li>`).text(`${shoppingcart.ingredients[1].Name}`)
        $ul.append($shoppingcart)
        $(`body`).append($ul)
        })
   }
getShoppingcarts()
$addShoppingcartsButton.on('click',getShoppingcarts)

const getIngredients = async() => {
    const data = await fetch(`${URL}/grocery`)
    console.log(data)
    const response = await data.json()

    console.log(response)

    response.forEach(ingredients => {
        $div = $(`<div>`)
        $name = $(`<p>`).text(ingredients.Name)
        $price = $(`<p>`).text(ingredients.Price)
        $addButton=$(`<button>`).text(`Add To Cart`)
        $input = $(`<input>`).attr("placeholder",`Cart Name`)
         $div.append($name,$price,$addButton,$input)
         

        //$ingredients = $(`<li>`).text(`${ingredients.Name} for ${ingredients.Price} dollars`).css("color","black")

        //$ul.append($ingredients)
        $(`#ingredients_container`).append($div)
    })
}
getIngredients()
$addIngredientsButton.on('click',getIngredients)

/*fetch(`${URL}/shoppingcart`)
.then(console.log(response))
.then(response => response.json())
//.then(console.log(response))
.then(data =>{
    data.forEach(shoppingcart =>{
        $shoppingcart = $(`<li>`).text(`${shoppingcart.name} is ${shoppingcart} is total`)
        $ul.append($shoppingcart)
    })
})*/