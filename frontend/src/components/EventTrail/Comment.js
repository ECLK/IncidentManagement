import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    container: {
        
    },
    buttonContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-end'
    },
    textarea: {
        width: "100%",
        border: "1px solid #ccc",
        height: "100px"
    },
    button: {
        margin: theme.spacing.unit,
    },
});

class Comment extends Component {

    constructor(props){
        super(props)
        this.state = {
            comment : "",
        }
    }

    onTextInputChange = (e) => {
        this.setState({
            comment : e.target.value,
        })
    }

    clearComment = () => {
        this.setState({
            comment:""
        })
    }

    postComment = () => {
        let commentObj = {
            incidentId : this.props.activeIncident ? this.props.activeIncident.id : null,
            comment : this.state.comment
        }
        this.props.postComment(commentObj);
        this.hideCommentInput()
    }

    hideCommentInput = () => {
        this.setState({
            comment:""
        })
        this.props.hideCommentInput()
    }
    
    render(){

        const { classes  } = this.props;
        return(
            <div className={classes.container}>
                <textarea 
                    value = {this.state.comment} 
                    onChange = {this.onTextInputChange}
                    className={classes.textarea}
                    />
    
                <div className={classes.buttonContainer}>
                    {/* <Button variant="contained" className={classes.button} onClick={this.hideCommentInput}>
                        Cancel
                    </Button>
                    <Button variant="contained" className={classes.button} onClick={this.clearComment}>
                        Clear
                    </Button> */}
                    <Button variant="contained" className={classes.button} onClick={this.postComment}>
                        Post
                    </Button>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Comment);