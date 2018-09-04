import React from 'react';

export default class UserView extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props.match.params.id);
    }

    render(){
        return(
            <div>
                היייי
            </div>
        )
    }
}
