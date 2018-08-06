import React, {Component} from 'react';
import withSession from '../withSession';
import { Mutation } from 'react-apollo';
import {LIKE_RECIPE} from "../../queries";

class LikeRecipe extends Component {

    state = {

        username: '',
        liked: false

    };

    componentDidMount(){
        if(this.props.session.getCurrentUser){
            const { username, favorites } = this.props.session.getCurrentUser;
            console.log(favorites);
            this.setState({ username });
        }
    };

    handleClick = likeRecipe => {
        this.setState(prevState => ({
                liked: !prevState.liked
            }),
            () => this.handleLike(likeRecipe)
        );
    };

    handleLike = (likeRecipe) => {
        if(this.state.liked) {
            likeRecipe().then(async ({data}) => {
                console.log(data);
                await this.props.refetch();
            });
        } else {
            //unlike
            console.log('unlike');
        }
    };



    render() {

        const { liked, username } = this.state;
        const { _id } = this.props;

        return(
            <Mutation mutation={LIKE_RECIPE} variables={{ _id, username }}>

                {likeRecipe => (
                    username && <button onClick={() => this.handleClick(likeRecipe)}>
                                    {liked ? 'Liked': 'Like'}
                                </button>

                    )}
            </Mutation>
        )
    }
}

export default withSession(LikeRecipe);