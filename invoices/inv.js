const vendors = ["רמי לוי שיווק השקמה", "מגה", "שופרסל", "חצי-חינם", "אושר עד",
          "ויקטורי", "טיב-טעם", "AM:PM"]

const products = [  
    {  
        id:"milk 1%",
        price: parseFloat((5.59+(Math.random() * 2)).toFixed(2))
    },
    {  
        id:"milk 3%",
        price:parseFloat((5.94+(Math.random() * 2)).toFixed(2))
    },
    {  
        id:"white bread",
        price:parseFloat((5.12+(Math.random() * 2)).toFixed(2))
    },
    {  
        id:"brown bread",
        price:parseFloat((5.12+(Math.random() * 2)).toFixed(2))
    },
    {  
        id:"butter",
        price:parseFloat((3.94+(Math.random() * 2)).toFixed(2))
    },
    {  
        id:"white cheese",
        price:parseFloat((4.75+(Math.random() * 2)).toFixed(2))
    },
    {  
        id:"eggs XL",
        price:parseFloat((12.4+(Math.random() * 2)).toFixed(2))
    },
    {  
        id:"eggs L",
        price:parseFloat((11.3+(Math.random() * 2)).toFixed(2))
    },
    {  
        id:"eggs M",
        price:parseFloat((10.4+(Math.random() * 2)).toFixed(2))
    },
    {  
        id:"kotej",
        price:parseFloat((5.7+(Math.random() * 2)).toFixed(2))
    },
    {  
        id:"onion 1kg",
        price:parseFloat((6.9+(Math.random() * 2)).toFixed(2))
    },
    {  
        id:"tester choise",
        price:parseFloat((29.9+(Math.random() * 2)).toFixed(2))
    },
    {  
        id:"banana 1kg",
        price:parseFloat((12.9+(Math.random() * 2)).toFixed(2))
    },
    {  
        id:"milki",
        price:parseFloat((2.9+(Math.random() * 2)).toFixed(2))
    },
    {  
        id:"sugar",
        price:parseFloat((5.5+(Math.random() * 2)).toFixed(2))
    },
    {  
        id:"tuna",
        price:parseFloat((24.9+(Math.random() * 2)).toFixed(2))
    },
    {  
        id:"pasta",
        price:parseFloat((7.5+(Math.random() * 2)).toFixed(2))
    },
    {  
        id:"ketchup",
        price:parseFloat((10.9+(Math.random() * 2)).toFixed(2))
    },
    {  
        id:"sweet corn",
        price:parseFloat((6.4+(Math.random() * 2)).toFixed(2))
    },
    {  
        id:"Coca Cola Zero",
        price:parseFloat((36.9+(Math.random() * 2)).toFixed(2))
    },
    {  
        id:"humus",
        price:parseFloat((14.9+(Math.random() * 2)).toFixed(2))
    },
    {  
        id:"chiken 1kg",
        price:parseFloat((24.9+(Math.random() * 2)).toFixed(2))
    },
    {  
        id:"Water 6pc",
        price:parseFloat((11.5+(Math.random() * 2)).toFixed(2))
    },
    {  
        id:"potato",
        price:parseFloat((5.9+(Math.random() * 2)).toFixed(2))
    },
    {  
        id:"salmon 1kg",
        price:parseFloat((99.9+(Math.random() * 2)).toFixed(2))
    }
]
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

var num= 4000*Math.floor((Math.random() * 10000) + 1);
let invoice = 
{
	invoiceNumber: num,
        date: randomDate(new Date(2019, 5, 1), new Date()),
	provider: vendors[Math.floor(Math.random()*vendors.length)],
	items: [
			products[Math.floor(Math.random()*products.length)],
			products[Math.floor(Math.random()*products.length)],
			products[Math.floor(Math.random()*products.length)],
			products[Math.floor(Math.random()*products.length)],
			products[Math.floor(Math.random()*products.length)],
			products[Math.floor(Math.random()*products.length)],
			products[Math.floor(Math.random()*products.length)],
			products[Math.floor(Math.random()*products.length)],
			products[Math.floor(Math.random()*products.length)],
		]
}

invoice["total"] = getTotalPrice(invoice["items"])
function getTotalPrice(items) {
	let total = 0;
	for (const item of items) {
		total+=item["price"]
	}
	return total;
}

console.log(JSON.stringify(invoice))

