//const Shoppingcart = require("../api/models/Shoppingcart")
const $addIngredientsButton = $('.ingredientsControl button')
const $addShoppingcartsButton = $('.ShoppingControl button')
const URL= "https://project2rachel.herokuapp.com"
//const URL = "http://localhost:3000"



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
        $ImageURL= $(`<p>`).text(ingredient.ImageURL)
        const id = ingredient._id
        console.log(id)
        
        $input = $(`<input>`).attr("placeholder", `Cart Name`).attr(`id`, id).on("change", ()=> saveCart(id));
        $addButton = $(`<button>`).text(`Add to Cart`).attr("class","addIngredientsbutton").on("click",() => addIngredients(cartName,id ));
        $div.append($name,$price,$ImageURL,$addButton,$input);

        $(`#ingredients_container`).append($div);
    });
    };




        //$input = $(`<input>`).attr("placeholder",`Cart Name`)
         //$div.append($name,$price,$addButton,$input)
         

       
        //$(`#ingredients_container`).append($div)
    //})
//}
getIngredients()

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
    const response = await fetch (URL + `/shoppingcart`,
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

(function () {
    /* In animations (to close icon) */
  
    const elasticIn = d3.easeElasticIn.amplitude(1).period(0.3);
    const elasticOut = d3.easeElasticOut.amplitude(1).period(0.3);
    const bounceOut = d3.easeBounceOut;
  
    var beginAC = 80,
      endAC = 320,
      beginB = 80,
      endB = 320;
  
    function inAC(s) {
      s.draw("80% - 240", "80%", 0.3, {
        delay: 0.1,
        callback: function () {
          inAC2(s);
        }
      });
    }
  
    function inAC2(s) {
      s.draw("100% - 545", "100% - 305", 0.6, {
        easing: elasticOut
      });
    }
  
    function inB(s) {
      s.draw(beginB - 60, endB + 60, 0.1, {
        callback: function () {
          inB2(s);
        }
      });
    }
  
    function inB2(s) {
      s.draw(beginB + 120, endB - 120, 0.3, {
        easing: bounceOut
      });
    }
  
    /* Out animations (to burger icon) */
  
    function outAC(s) {
      s.draw("90% - 240", "90%", 0.1, {
        easing: elasticIn,
        callback: function () {
          outAC2(s);
        }
      });
    }
  
    function outAC2(s) {
      s.draw("20% - 240", "20%", 0.3, {
        callback: function () {
          outAC3(s);
        }
      });
    }
  
    function outAC3(s) {
      s.draw(beginAC, endAC, 0.7, {
        easing: elasticOut
      });
    }
  
    function outB(s) {
      s.draw(beginB, endB, 0.7, {
        delay: 0.1,
        // easing: ease.ease("elastic-out", 2, 0.4),
        easing: elasticOut
      });
    }
  
    /* Awesome burger default */
  
    var pathA = document.getElementById("pathA"),
      pathB = document.getElementById("pathB"),
      pathC = document.getElementById("pathC"),
      segmentA = new Segment(pathA, beginAC, endAC),
      segmentB = new Segment(pathB, beginB, endB),
      segmentC = new Segment(pathC, beginAC, endAC),
      trigger = document.getElementById("menu-icon-trigger"),
      toCloseIcon = true,
      wrapper = document.getElementById("menu-icon-wrapper");
  
    wrapper.style.visibility = "visible";
  
    trigger.onclick = function () {
      if (toCloseIcon) {
        inAC(segmentA);
        inB(segmentB);
        inAC(segmentC);
      } else {
        outAC(segmentA);
        outB(segmentB);
        outAC(segmentC);
      }
      toCloseIcon = !toCloseIcon;
    };
  })();
  