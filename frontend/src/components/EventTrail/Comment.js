import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import FroalaEditor from 'react-froala-wysiwyg';

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
            isOutcome: false
        }
    }

    onTextInputChange = (comment) => {
        this.setState({
            comment : comment
        })
    }

    onCheckBoxChange = (e) => {
        this.setState({
            isOutcome: e.target.checked
        })
    }

    clearAll = () => {
        this.setState({
            comment: "",
            isOutcome: false
        })
    }

    postComment = () => {
        let commentObj = {
            isOutcome: this.state.isOutcome,
            comment : this.state.comment
        }
        this.props.postComment(this.props.activeIncident.id, commentObj);
        this.clearAll();
    }
    
    render(){

        const { classes  } = this.props;
        return(
            <div className={classes.container}>
                <FroalaEditor
                    tag='textarea'
                    model={this.state.comment}
                    onModelChange={this.onTextInputChange}
                />
                <FormGroup row>
                    <FormControlLabel
                    control={
                        <Checkbox
                        checked={this.state.isOutcome}
                        onChange={this.onCheckBoxChange}
                        value="checkedA"
                        />
                    }
                    label="Mark as outcome"
                    />
                </FormGroup>
                <div className={classes.buttonContainer}>
                    <Button variant="contained" className={classes.button} onClick={this.postComment}>
                        Post
                    </Button>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Comment);