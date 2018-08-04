import React from 'react';

import { Query } from 'react-apollo';
import { GET_USER_RECIPES} from "../../queries";
import { Link } from 'react-router-dom'

const UserRecipes = ({ username }) => (

        <Query query={GET_USER_RECIPES} variables={{ username }}>

            {({ data, loading, error }) => {
                if (loading) return <div>Loading...</div>
                if (error) return <div>Error</div>

                console.log(data);

                return (
                    <h3>Your Recipes</h3>
                    {data.getUserRecipes.map(recipe => (
                        <li>
                            <p></p>
                        </li>

                    ))}
                )
            }}

        </Query>
);

export default UserRecipes;
