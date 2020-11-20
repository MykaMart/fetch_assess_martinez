let items;

const processItems = async () => {

	//Fetch Items

	// no-cors present on API, using cors-anaywhere proxy spooled up to heroku
	const corsProxy = 'https://murmuring-scrubland-09949.herokuapp.com/'
	const fetchAPI = 'fetch-hiring.s3.amazonaws.com/hiring.json'

	const items = await fetch(corsProxy + fetchAPI)
						.then(res => res.json())
}



