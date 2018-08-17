import React from 'react';
//Test
export default class EditabelInput extends React.Component{
    constructor(props){
        super();
        this.state = {
            disable: true
        }
    }

    onEditClick = () => {
        const disable = !this.state.disable;
        this.setState({disable});
    }

    render(){
        return(
            <div>
                <label><span className="input_label">{this.props.label}</span>
                    <input type="text" value={this.props.val} onChange={this.props.onChangeValue} disabled={this.state.disable}/>
                    {this.state.disable? (
                        <span className="start__edit_input" onClick={this.onEditClick}>ערוך/י</span>
                    ):(
                        <span  className="end__edit_input" onClick={this.onEditClick}>סיימ/י עריכה</span>           
                    )}
                </label>
            </div>
        )        
    }
}
