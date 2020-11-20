let processedItems;

const processItems = async () => {

	//Fetch Items

	// no-cors present on API, using cors-anaywhere proxy spooled up to heroku
	const corsProxy = 'https://murmuring-scrubland-09949.herokuapp.com/'
	const fetchAPI = 'fetch-hiring.s3.amazonaws.com/hiring.json'

	const items = await fetch(corsProxy + fetchAPI)
						.then(res => res.json())

	return items
}

const sortFilterItems = (items) => {
	// Filter Unnamed Items
	console.log(items)
	let filteredItems = items.filter((item) => {
		let named = true
		if (item.name == "" || item.name == null){
			named = false
		}
		return named
	})

	// Sort Items

	let sortedItems = filteredItems.sort((item1, item2) => {

		let itemNumber1 = parseInt(item1.name.substring(5))
		let itemNumber2 = parseInt(item2.name.substring(5))

		if (item1.listId > item2.listId){
			return 1
		} else if (item1.listId < item2.listId) {
			return -1
		}

		if (itemNumber1 > itemNumber2){
			return 1
		} else if (itemNumber1 < itemNumber2) {
			return -1
		}
	})

	return sortedItems

}

processItems()
	.then(response => sortFilterItems(response))
	.then(processed => {processedItems = processed})

console.log(processedItems)