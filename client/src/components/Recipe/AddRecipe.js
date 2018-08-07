import React from 'react';
import { Mutation } from 'react-apollo';
import {ADD_RECIPE, GET_ALL_RECIPES, GET_USER_RECIPES} from "../../queries";
import Error from "../Error";
import { withRouter } from 'react-router-dom';
import withAuth from '../withAuth';
import CKEditor from 'react-ckeditor-component';

const initialState = {

    name: '',

    imageUrl: '',

    category:'Breakfast',

    description: '',

    instructions: '',

    username: ''

};

class AddRecipe extends React.Component{



    state = { ...initialState};

    clearState = () => {
        this.setState({ ...initialState });
    };

    componentDidMount(){
        this.setState({
            username: this.props.session.getCurrentUser.username
        });
    }

    handleSubmit = (event, addRecipe) => {
        event.preventDefault();
        addRecipe().then(({ data }) => {
            this.clearState();
            this.props.history.push("/");
        });
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleEditorChange = event => {
       const newContent = event.editor.getData();
       this.setState({ instructions: newContent });
    };

    validateForm = () => {
        const { name, imageUrl, category, description, instructions, username } = this.state;

        const isInvalid = !name || !imageUrl || !category || !description || !instructions || !username;

        return isInvalid;

    };

    updateCache = (cache, {data: { addRecipe }}) => {
        const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES });

        cache.writeQuery({
            query: GET_ALL_RECIPES,
            data: {
                getAllRecipes: [addRecipe, ...getAllRecipes]
            }
        });
    };

    render() {

        const { name, imageUrl, category, description, instructions, username } = this.state;

        return(
            <Mutation mutation={ADD_RECIPE} variables={{ name, imageUrl, category, description, instructions, username }} update={this.updateCache}
            refetchQueries={() => [
                { query: GET_USER_RECIPES, variables: { username } }
                ]}
            >

                {( addRecipe, { data, loading, error}) => {

                    return (

                        <div className="App">
                            <h2 className="App">Add Recipe</h2>
                            <form className="form" onSubmit={event => this.handleSubmit(event, addRecipe)}>
                                <input type="text" name="name" onChange={this.handleChange} placeholder="Recipe Name" value={name}/>
                                <input type="text" name="imageUrl" onChange={this.handleChange} placeholder="Recipe Image URL" value={imageUrl}/>
                                <select name="category" onChange={this.handleChange} value={category}>
                                    <option value="Breakfast">Breakfast</option>
                                    <option value="Lunch">Lunch</option>
                                    <option value="Dinner">Dinner</option>
                                    <option value="Snack">Snack</option>
                                </select>
                                <input type="text" name="description" onChange={this.handleChange} placeholder="Add Description" value={description}/>
                                <label htmlFor="instructions">Add Instructions</label>
                                <CKEditor name="instructions" content={instructions} events={{ change: this.handleEditorChange}}/>
                                <button type="submit" className="button-primary" disabled={loading || this.validateForm()}>Submit</button>
                                {error && <Error error={error}/>}
                            </form>
                        </div>

                    );

                }}
            </Mutation>
        );
    }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(AddRecipe));