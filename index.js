
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories));
}

function loadCategoryPlants(categoryId) {
    fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
        .then(res => res.json())
        .then(data => displayPlants(data.plants));
}

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("category-container");

    categoryContainer.innerHTML = `
        <button class="block text-xl hover:rounded-full hover:text-[#FFFFFF] hover:bg-[#15803D] p-0 md:p-3" onclick="loadPlants()">
            All Trees
        </button>
    `;
    categories.forEach(category => {
        categoryContainer.innerHTML += `
            <button class="block p-0 md:p-3 text-xl hover:rounded-full hover:text-white hover:bg-[#15803D]" 
                onclick="loadCategoryPlants('${category.id}')">
                ${category.category_name}
            </button>
        `;
    });
};


const loadPlants = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
        .then((res) => res.json())
        .then((json) => displayPlants(json.plants));
};

async function loadPlantDetail(id) {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPlantDetails(data.plants);
}

function displayPlantDetails(plants) {
    const detailsBox = document.getElementById('details-container');
    detailsBox.innerHTML = `
        <h3 class="font-bold text-2xl mb-3">${plants.name}</h3>
        <img class="w-full h-[250px] object-cover  rounded-md" src="${plants.image}" alt="" class="rounded-xl mb-4" />
        <p><span class="font-bold">Category:</span> ${plants.category}</p>
        <p><span class="font-bold">Price:</span> ৳${plants.price}</p>
        <p class="mt-2"><span class="font-bold">Description:</span> ${plants.description}</p>
    `;
    document.getElementById("plant_modal").showModal();
}


let cart = [];
let total = 0;
function addToCart(plant) {
    const existingItem = cart.find(item => item.id === plant.id);

    if (existingItem) {
        existingItem.quantity += 1;
        total += plant.price;
    } else {
        cart.push({ ...plant, quantity: 1 });
        total += plant.price;
    }

    updateCart();
}
function removeFromCart(index) {
    total -= cart[index].price * cart[index].quantity;
    cart.splice(index, 1);
    updateCart();
}



function updateCart() {
    const cartList = document.getElementById("cart-list");
    const cartTotal = document.getElementById("cart-total");
    const totalContainer = document.getElementById("total-container");

    cartList.innerHTML = "";

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "flex justify-between items-center bg-white p-2 rounded shadow";
        li.innerHTML = `
          <div class="flex flex-col">
            <span class="font-semibold">${item.name}</span>
            <span class="text-gray-600">৳${item.price} × ${item.quantity}</span>
          </div>
          <button class="text-red-500 font-bold" onclick="removeFromCart(${index})">❌</button>
        `;
        cartList.appendChild(li);
    });

    if (cart.length === 0) {
        totalContainer.style.display = "none";
    } else {
        totalContainer.style.display = "flex";
        cartTotal.textContent = total;
    }
}



const displayPlants = (plants) => {
    const allPlants = document.getElementById("all-plants");
    allPlants.innerHTML = "";

    for (let plant of plants) {
        const plantDiv = document.createElement('div');
        plantDiv.innerHTML = `
        <div class=" md:h-[381px] card bg-base-100 w-full max-w-sm shadow-sm p-2 gap-2">
            <figure>
                <img class="w-full h-50" src="${plant.image}" alt="" />
            </figure>
            <h2 class="card-title cursor-pointer" onclick="loadPlantDetail('${plant.id}')">${plant.name}</h2>

            <p class="text-sm text-gray-500 text-justify">
                ${plant.description}
            </p>
            <div class="card-actions justify-between">
                <button class="badge rounded-full bg-[#DCFCE7] text-[#15803D] font-semibold text-base">${plant.category}</button>
                <div class="font-semibold text-lg"><span class="font-bangla">৳</span>${plant.price}</div>
            </div>
        
            <button 
              onclick='addToCart({id: "${plant.id}", name: "${plant.name}", price: ${plant.price}})' 
              class="btn mt-2 rounded-full font-semibold border-none w-full bg-[#15803D] text-[#FFFFFF]">
              Add to Cart
            </button>
        </div>
        `;
        allPlants.append(plantDiv);
    }
};


loadPlants();

loadCategories();