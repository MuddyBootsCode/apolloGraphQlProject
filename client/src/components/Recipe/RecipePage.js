import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_RECIPE} from "../../queries";
import LikeRecipe from './LikeRecipe';
import Spinner from '../Spinner';

const RecipePage = ({ match }) => {

    const { _id } = match.params;

    return (
       <Query query={ GET_RECIPE } variables={{ _id }}>

           {({ data, loading, error }) => {
               if (loading) return <Spinner/>
               if (error) return <div>{error}</div>

               const { getRecipe: { name, imageUrl, category, description, instructions, likes, username} } = data;

               return <div className="App">
                           <div className="recipe-image" style={{ background: `url(${imageUrl})
                            center center / cover no-repeat`}}>
                           </div>
                           <div className="recipe">
                               <div className="recipe-header">
                                   <h2 className="recipe-name">
                                       <strong>{name}</strong>
                                   </h2>
                                   <h5>
                                       <strong>
                                           {category}
                                       </strong>
                                       <p>Created by {username}</p>
                                       <p>{likes}<span role="img" aria-label="sunglasses-emoji">😎</span></p>
                                   </h5>
                               </div>
                               <blockquote className="recipe-description">
                                   {description}
                               </blockquote>
                               <h3 className="recipe-instructions__title">
                                   Instructions
                               </h3>
                               <div className="recipe-instructions" dangerouslySetInnerHTML={{ __html: instructions }}>

                               </div>
                               <LikeRecipe _id={_id} className="App"/>
                           </div>
                      </div>
           }}

       </Query>
    );
};

export default withRouter(RecipePage);
