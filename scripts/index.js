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
	// console.log(items)
	let filteredItems = items.filter((item) => {
		let named = true
		if (item.name == '' || item.name == null){
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

const appendItemsToDom = (items) => {
	const columns = document.getElementById('itemsColumns');
	items.map((item, index) => {

		const card = document.createElement('div')
		card.className = 'card'
		card.id = 'card-' + index.toString();

		const listId = document.createElement('p')
		const idText = document.createTextNode('List ID: ' + item.listId.toString())
		listId.appendChild(idText)
		listId.className = 'listId';
		listId.id = 'id-' + item.listId.toString();

		const name = document.createElement('p')
		const nameText =document.createTextNode(item.name)
		name.appendChild(nameText)
		name.className = 'listId';
		name.id = 'id-' + item.name;

		card.appendChild(listId);
		card.appendChild(name);
		columns.appendChild(card);
		
		// console.log(item)
	})
}

processItems()
	.then(response => sortFilterItems(response))
	.then(processed => appendItemsToDom(processed))