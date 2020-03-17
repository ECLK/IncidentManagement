import Autosuggest from 'react-autosuggest';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { throttle } from "lodash";
import { withStyles } from '@material-ui/core/styles';

function renderInputComponent(inputProps) {
    const { classes, inputRef = () => { }, ref, ...other } = inputProps;

    return (
        <TextField
            fullWidth
            InputProps={{
                inputRef: node => {
                    ref(node);
                    inputRef(node);
                },
                classes: {
                    input: classes.input,
                },
            }}
            {...other}
        />
    );
}

const renderSuggestion = suggestion => {
    return (
        <MenuItem component="div">
            <div>{`${suggestion.title} - ${suggestion.letterDate}`}</div>
        </MenuItem>
    );
}

const styles = theme => ({
    root: {
        height: 250,
        flexGrow: 1,
    },
    container: {
        position: 'relative',
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
});

class AutosuggestInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            popper: '',
            suggestions: [],
        };
        this.handleSuggestionsFetchRequested = this.handleSuggestionsFetchRequested.bind(this);
        this.handleSuggestionsFetchThrottled = throttle(this.handleSuggestionsFetchRequested, 2000)
    }

    componentDidUpdate(prevProps) {
        if (this.props.data != prevProps.data) {
            this.setState({ suggestions: this.props.data });
        }
    }

    getSuggestionValue = suggestion => {
        this.setState({
            value: '',
        });

        // open incident in new browser tab
        let url = '';
        // if (window.location.protocol !== 'http:') {
        //     url = `http://${window.location.origin.toString()}/app/review/${suggestion.id}`.replace(/^http:/, 'https:');
        // }
        // else {
        //     url = `${window.location.origin.toString()}/app/review/${suggestion.id}`;
        // }
        url = `${window.location.origin.toString()}/app/review/${suggestion.id}`;
        window.open(url);

        return '';
    }

    handleSuggestionsFetchRequested = ({ value, reason }) => {
        if (value.length > 2 && reason == "input-changed") {
            this.props.onFetchSimilarInquiries(value, this.props.incidentType);
        } else if (reason == "input-focused") {
            this.setState({
                suggestions: this.state.suggestions,
            });
        }
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    handleChange = () => (event, value) => {
        this.setState({
            value: value.newValue,
        });
        this.props.onChange(event);
    };

    render() {
        const { classes, incidentType } = this.props;
        
        const autosuggestProps = {
            renderInputComponent,
            suggestions: this.state.suggestions,
            onSuggestionsFetchRequested: this.handleSuggestionsFetchThrottled,
            onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
            getSuggestionValue: this.getSuggestionValue,
            renderSuggestion,
        };

        return (
            <Autosuggest
                {...autosuggestProps}
                inputProps={{
                    classes,
                    type: "text",
                    name: "title",
                    label: (incidentType==="INQUIRY") ? "Topic*" : "Title*",
                    placeholder: "Start typing in to see if there are similar ones..",
                    value: this.state.value,
                    onChange: this.handleChange(),
                    className: this.props.className,
                    onBlur: this.props.onBlur,
                    error: this.props.error,
                    helperText: this.props.helperText
                }}
                theme={{
                    container: classes.container,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion,
                }}
                renderSuggestionsContainer={options => (
                    <Paper {...options.containerProps} square>
                        {options.children}
                    </Paper>
                )}
            />
        );
    }
}

AutosuggestInput.propTypes = {
    classes: PropTypes.object.isRequired,
    institutions: PropTypes.array,
    onChange: PropTypes.func,
};

export default withStyles(styles)(AutosuggestInput);
