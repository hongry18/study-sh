import React from 'react';
import Contact from './Contact';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name : ""
		};
	}
	render(){
		return (
			<div>
				<button onClick={() => {this.setState({name: "YJM"});}}>Click</button>
				<h1>Hello React</h1>
				<h2>{this.state.name}</h2>
				<Contact/>
			</div>
			);
	}
}

export default App;