import React from 'react';

import { Query, Mutation } from 'react-apollo';
import {GET_USER_RECIPES, DELETE_USER_RECIPE, GET_ALL_RECIPES, GET_CURRENT_USER, UPDATE_USER_RECIPE} from "../../queries";
import { Link } from 'react-router-dom'
import Spinner from "../Spinner";



class UserRecipes extends React.Component {

    state = {
        _id: '',
        name: '',
        imageUrl: '',
        category: '',
        description: '',
        modal: false

    };

    handleDelete = deleteUserRecipe => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this recipe?"
        );
        if (confirmDelete) {
            deleteUserRecipe().then(({ data }) => {
            });
        }
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    closeModal = () => {
        this.setState({ modal: false })
    };

    loadRecipe = recipe => {
        this.setState({ ...recipe, modal: true});
    };

    handleSubmit = (event, updateUserRecipe) => {
        event.preventDefault();
        updateUserRecipe().then(({ data }) => {
            console.log(data);
            this.closeModal();
        })

    };

    render(){

    const { username } = this.props;

    const { modal } = this.state;

    return (

    <Query query={GET_USER_RECIPES} variables={{username}}>

    {({data, loading, error}) => {
        if (loading) return <Spinner/>
        if (error) return <div>Error</div>


        return (
            <ul>

                { modal &&(
                    <EditRecipeModal
                        recipe={this.state}
                        closeModal={this.closeModal}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}/>
                ) }

                <h3>Your Recipes</h3>

                {!data.getUserRecipes.length && <p>You have not added any recipes yet.</p>}

                {data.getUserRecipes.map(recipe => (
                    <li key={recipe._id}>
                        <Link to={`/recipes/${recipe._id}`}>
                            <p>{recipe.name}</p>
                        </Link>
                        <p style={{marginBottom: "0"}}>Likes: {recipe.likes}</p>

                        <Mutation mutation={DELETE_USER_RECIPE}
                                  variables={{_id: recipe._id}}
                                  refetchQueries={() => [
                                      {query: GET_ALL_RECIPES},
                                      {query: GET_CURRENT_USER}
                                  ]}
                                  update={(cache, {data: {deleteUserRecipe}}) => {
                                      const {getUserRecipes} = cache.readQuery({
                                          query: GET_USER_RECIPES,
                                          variables: {username}
                                      });

                                      cache.writeQuery({
                                          query: GET_USER_RECIPES,
                                          variables: {username},
                                          data: {
                                              getUserRecipes: getUserRecipes.filter(recipe => recipe._id !==
                                                  deleteUserRecipe._id)
                                          }
                                      })
                                  }}
                        >

                            {(deleteUserRecipe, attrs = {}) => (
                                <div>
                                    <button className="button-primary" onClick={() => this.loadRecipe(recipe)}>Update</button>
                                    <p className="delete-button"
                                       onClick={() => this.handleDelete(deleteUserRecipe)}
                                    >
                                        {attrs.loading ? 'deleting...' : 'X'}
                                    </p>
                                </div>
                            )
                            }
                        </Mutation>
                    </li>

                ))}

            </ul>
        )
    }}

    </Query>
    )
}
}

const EditRecipeModal = ({ handleChange, closeModal, recipe, handleSubmit }) => (
    <Mutation mutation={UPDATE_USER_RECIPE} variables={{
        _id: recipe.id,
        name: recipe.name,
        imageUrl: recipe.imageUrl,
        category: recipe.category,
        description: recipe.description
    }}>
        {updateUserRecipe => (
            <div className="modal modal-open">
                <div className="modal-inner">
                    <div className="modal-content">
                        <form onSubmit={(event) => handleSubmit(event, updateUserRecipe)} className="modal-content-inner">
                            <h4>Edit Recipe</h4>
                            <input type="text" name="name" onChange={handleChange} value={recipe.name}/>
                            <input type="text" name="imageUrl" onChange={handleChange} value ={recipe.imageUrl}/>
                            <select name="category" onChange={handleChange} value={recipe.category}>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                                <option value="Snack">Snack</option>
                            </select>
                            <input type="text" name="description" onChange={handleChange} value={recipe.description}/>
                            <hr/>
                            <div className="modal-buttons">
                                <button type="submit" className="button-primary">Update</button>
                                <button onClick={closeModal}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )}
    </Mutation>
);

export default UserRecipes;
