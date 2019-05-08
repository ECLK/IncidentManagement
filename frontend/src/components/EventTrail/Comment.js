import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    buttonContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        width: 700
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 700,
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
        this.props.postComment(this.state.comment)
        this.setState({
            comment:""
        })
    }

    hideCommentInput = () => {
        this.setState({
            comment:""
        })
        this.props.hideCommentInput()
    }
    
    render(){

        const { classes, hideCommentInput } = this.props;
        return(
            <div>
                <TextField
                    id="newComment"
                    label="Add comment"
                    multiline
                    className={classes.textField}
                    margin="normal"
                    value = {this.state.comment}
                    onChange = {this.onTextInputChange}
                />
                <div className={classes.buttonContainer}>
                    <Button variant="contained" className={classes.button} onClick={this.hideCommentInput}>
                        Cancel
                    </Button>
                    <Button variant="contained" className={classes.button} onClick={this.clearComment}>
                        Clear
                    </Button>
                    <Button variant="contained" className={classes.button} onClick={this.postComment}>
                        Post
                    </Button>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Comment);