import React from 'react';
//Test
export default class EditabelInput extends React.Component{
    constructor(props){
        super();
        this.state = {
            disable: true,
            val: props.val || ''
        }
    }

    onInputChange = (e) => {
        const val = e.target.value;
        this.setState({val});
    }
    onEditClick = () => {
        const disable = !this.state.disable;
        this.setState({disable});
        this.props.onChangeValue(this.state.val);
    }

    render(){
        return(
            <div>
                <label><span className="input_label">{this.props.label}</span>
                    <input type="text" value={this.state.val} onChange={this.onInputChange} disabled={this.state.disable}/>
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







