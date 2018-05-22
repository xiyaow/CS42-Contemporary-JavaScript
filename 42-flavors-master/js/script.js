/* Sets a random integer quantity in range [1, 20] for each flavor. */
function setQuantities() {
  const metas = document.querySelectorAll(".flavor .meta")
  
  Array.from(metas).forEach(meta => {
  	const newSpan = document.createElement("span")
  	newSpan.classList.add("quantity")

  	const theFirstChild = meta.firstChild
  	meta.insertBefore(newSpan, theFirstChild)

  	newSpan.innerHTML = Math.floor(Math.random() * 20) + 1
  })

}

/* Extracts and returns an array of flavor objects based on data in the DOM. Each
 * flavor object should contain five properties:
 *
 * element: the HTMLElement that corresponds to the .flavor div in the DOM
 * name: the name of the flavor
 * description: the description of the flavor
 * price: how much the flavor costs
 * quantity: how many cups of the flavor are available
 */
function extractFlavors() {
	const flavorElements = document.getElementsByClassName("flavor")
	let flavors = []
	let count = 0
	Array.from(flavorElements).forEach(flavorElement => {
		const flavor ={
			element: flavorElement,
			name: document.querySelectorAll(".description h2")[count].innerHTML,
			description: document.querySelectorAll(".description p")[count].innerHTML,
			price: Number(document.querySelectorAll(".price")[count].innerHTML.substring(1)),
			quantity: document.querySelectorAll(".quantity")[count].innerHTML
		}
		count++
		flavors.push(flavor)
	})
	return flavors
}

/* Calculates and returns the average price of the given set of flavors. The
 * average should be rounded to two decimal places. */
function calculateAveragePrice(flavors) {
	let totalPrice = 0
	Array.from(flavors).forEach(flavor => {
		totalPrice += flavor.price
	})

	let average = totalPrice / flavors.length
	return average.toFixed(2)

}

/* Finds flavors that have prices below the given threshold. Returns an array
 * of strings, each of the form "[flavor] costs $[price]". There should be
 * one string for each cheap flavor. */
function findCheapFlavors(flavors, threshold) {

  const cheapFlavors = flavors.filter(flavor => flavor.price < threshold)
  const reformat = cheapFlavors.map(flavor =>
  	flavor.name + " costs $" + flavor.price
  	)
  return reformat
}

/* Populates the select dropdown with options. There should be one option tag
 * for each of the given flavors. */
function populateOptions(flavors) {
	const sample= document.querySelector('select[name="flavor"]')
	sample.remove(0)

  Array.from(flavors).forEach(flavor => {
  	const addFlavor = document.createElement("option")
  	addFlavor.value = flavor.name
  	addFlavor.innerHTML = flavor.name
  	const list = document.querySelector('select[name="flavor"]')
  	list.appendChild(addFlavor)
  })

}

/* Processes orders for the given set of flavors. When a valid order is made,
 * decrements the quantity of the associated flavor. */
function processOrders(flavors) {	
	const submit = document.querySelector('form')
	submit.addEventListener('submit', event => {
		const amount = parseInt(document.querySelector('input[name="amount"]').value)
		const selectedFlavor = document.querySelector('select[name="flavor"]').value
	  	
	  	Array.from(flavors).forEach(flavor => {
	  		if(selectedFlavor === flavor.name){
	  			if(amount > flavor.quantity || !Number.isInteger(amount)|| amount <= 0){
	  				return
	  			}else{
	  				flavor.quantity -= amount
	  				flavor.element.querySelector(".quantity").innerHTML -= amount
	  			}
	  		}
	  })
  	event.preventDefault()
  })
}

/* Highlights flavors when clicked to make a simple favoriting system. */
function highlightFlavors(flavors) {
	Array.from(flavors).forEach(flavor => {
		flavor.element.addEventListener('click', event => {
			flavor.element.classList.toggle("highlighted")
		})
	})
}


/***************************************************************************/
/*                                                                         */
/* Please do not modify code below this line, but feel free to examine it. */
/*                                                                         */
/***************************************************************************/


const CHEAP_PRICE_THRESHOLD = 1.50

// setting quantities can modify the size of flavor divs, so apply the grid
// layout *after* quantities have been set.
setQuantities()
const container = document.getElementById('container')
new Masonry(container, { itemSelector: '.flavor' })

// calculate statistics about flavors
const flavors = extractFlavors()
const averagePrice = calculateAveragePrice(flavors)
console.log('Average price:', averagePrice)

const cheapFlavors = findCheapFlavors(flavors, CHEAP_PRICE_THRESHOLD)
console.log('Cheap flavors:', cheapFlavors)

// handle flavor orders and highlighting
populateOptions(flavors)
processOrders(flavors)
highlightFlavors(flavors)
