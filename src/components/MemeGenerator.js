import React, { Component } from 'react';

export default class MemeGenerator extends Component {
	constructor() {
		super();
		this.state = {
			top: '',
			bottom: '',
			randomImg: 'http://i.imgflip.com/1bij.jpg'
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	componentDidMount() {
		fetch('https://api.imgflip.com/get_memes').then((Response) => Response.json()).then((Response) => {
			const { memes } = Response.data;
			this.setState({
				allMemeImgs: memes
			});
		});
	}
	handleChange(e) {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	}
	handleClick(e) {
		e.preventDefault();
		const random = Math.floor(Math.random() * this.state.allMemeImgs.length);
		this.setState({
			randomImg: this.state.allMemeImgs[random].url
		});
	}
	render() {
		return (
			<div className="container">
				<form className="meme-form">
					<input
						type="text"
						name="top"
						value={this.state.top}
						onChange={this.handleChange}
						placeholder="top text"
					/>
					<input
						type="text"
						name="bottom"
						value={this.state.bottom}
						onChange={this.handleChange}
						placeholder="bottom text"
					/>
					<button type="submit" onClick={this.handleClick}>
						Gen
					</button>
				</form>
				<div className="meme">
					<img src={this.state.randomImg} alt="" />
					<h2 className="top">{this.state.top}</h2>
					<h2 className="bottom">{this.state.bottom}</h2>
				</div>
			</div>
		);
	}
}
