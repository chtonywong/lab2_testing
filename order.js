const form = document.getElementById("form");


let price = 0;

function calculatePrice(){
    var choice_drink = document.getElementById("drink");
    var choice_size = document.querySelector('input[name="size"]:checked');

    if (choice_drink.value === "Bubble Milktea") { //checking price for drink
        switch(choice_size.value){
            case "size_small":
                price = 15;
                break;
            case "size_medium":
                price = 20;
                break;
            case "size_large":
                price = 25;
                break;
            default:
        }
    }else if( choice_drink.value === "Iced Latte") {
        switch(choice_size.value){
            case "size_small":
                price = 18;
                break;
            case "size_medium":
                price = 22;
                break;
            case "size_large":
                price =26;
                break;
            default:
        }
    }else {
        alert("Please select a drink."); //no drink selected action
        const radioSize = document.getElementsByName("size");
        radioSize.forEach(button => {
            if (button.type === "radio") {
                button.checked = false;
            }
        });
        const radioIce = document.getElementsByName("ice");
        radioIce.forEach(button => {
            if (button.type === "radio") {
                button.checked = false;
            }
        });
        const radioSweet = document.getElementsByName("sweetness");
        radioSweet.forEach(button => {
            if (button.type === "radio") {
                button.checked = false;
            }
        });
    }

    let updatePrice = document.getElementById("price");
    updatePrice.innerHTML = price;//update price
}

function validateForm(){
    let customer_name = document.getElementById("CustomerName").value.trim();
    var choice_drink = document.getElementById("drink").value;
    let validateState = true;
    
    const radioSize = document.getElementsByName("size");//validate size
    let validateSize = false;
    radioSize.forEach(button => {
        if (button.checked) {
            validateSize = true;
        }
    });

    const radioIce = document.getElementsByName("ice");//validate ice
    let validateIce = false;
    radioIce.forEach(button => {
        if (button.checked) {
            validateIce = true;
        }
    });

    const radioSweet = document.getElementsByName("sweetness");//validate sweetness
    let validateSweet = false;
    radioSweet.forEach(button => {
        if (button.checked) {
            validateSweet = true;
        }
    });

    try{ //error raising
        if(!customer_name){
            alert("Username is required.");
            throw new Error("Username is required.");
        }
        if(choice_drink === "Please Select"){
            alert("Please select a drink.");
            throw new Error("Type of drink.");
        }
        if(!validateSize){
            alert("Please select a size.")
            throw new Error("Size.");
        }
        if(!validateIce){
            alert("Please select the amount of ice.")
            throw new Error("Amount of ice.");
        }
        if(!validateSweet){
            alert("Please select the sweetness.")
            throw new Error("Sweetness.");
        }
    }
    catch(error){
        console.log("Please enter all necessary informations.", error.message);
        validateState = false;
    }
    console.log(validateState);
    return validateState;//return validation state, ok for submit or not
}

function placeOrder(event){
    event.preventDefault();
    let orderState = validateForm();
    let orderData =[];

    if(orderState){ //if order is validated and ok to go
        orderData.push(document.getElementById("CustomerName").value.trim());
        orderData.push(document.getElementById("drink").value);
        orderData.push(document.querySelector('input[name="size"]:checked'));
        orderData.push(document.querySelector('input[name="ice"]:checked'));
        orderData.push(document.querySelector('input[name="sweetness"]:checked'));
        localStorage.setItem("orders", orderData);
        console.log(orderData);
        alert("Order successful. Thank you for your order.")
        document.getElementById("form").reset();
        document.getElementById("price").innerHTML = 0;
    }else{
        return;
    }

}