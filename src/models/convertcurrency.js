const convertcurrency = {
    state : 0,
	reducers: {
		hello() {
			alert("xin chao");
		}
	},
	effects: dispatch => ({
		async getSupportSymbols() {
			alert("abc");
			let url = "https://api.exchangeratesapi.io/latest";
			fetch(url)
			  .then(response => response.json())
			  .then(data => {
				var keys = [];
				for (var k in data.rates) keys.push(k);
				this.setState({ symbols: keys });
			
			  });
		},
	}),
}

export default convertcurrency;