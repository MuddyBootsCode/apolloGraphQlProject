import React from 'react';
import { Mutation } from 'react-apollo';yield


class AddRecipe extends React.Component{

    state = {

        name: '',

        category:'Breakfast',

        description: '',

        instructions: '',

        username: ''

    };

    componentDidMount(){
        this.setState({
            username: this.props.session.getCurrentUser.username
        });
    }

    handleChange = event => {
        const { name, value } = event.target;
        //console.log(name, ":", value);
        this.setState({

            [name]: value

        });
    };

    render() {

        const { name, category, description, instructions } = this.state;

   return (

    <div className="App">
        <h2 className="App">Add Recipe</h2>
        <form className="form">
            <input type="text" name="name" onChange={this.handleChange} placeholder="Recipe Name" value={name}/>
            <select name="category" onChange={this.handleChange} value={category}>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
            </select>
            <input type="text" name="description" onChange={this.handleChange} placeholder="Add Description" value={description}/>
            <textarea name="instructions" onChange={this.handleChange} placeholder="Add Instructions" value={instructions}></textarea>
            <button type="submit" className="button-primary">Submit</button>
        </form>
    </div>

)}};

export default AddRecipe;