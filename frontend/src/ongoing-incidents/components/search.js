import Autosuggest from 'react-autosuggest';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import deburr from 'lodash/deburr';
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

function renderSuggestion(suggestion, { query, isHighlighted }) {

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>{suggestion.text}</div>
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
    state = {
        value: '',
        popper: '',
        suggestions: [],
    };

    componentDidMount() {
        if (this.props.institutions && this.props.institutions.allCodes && this.props.institutions.allCodes.length > 0) {
            const list = this.props.institutions.allCodes.map(code => {
                return ({
                    label: this.props.institutions.byCode[code].name,
                    code: this.props.institutions.byCode[code].code,
                    text: this.props.institutions.byCode[code].name + ', '
                        + this.props.institutions.byCode[code].sn_name + ', '
                        + this.props.institutions.byCode[code].tm_name,
                })
            });
            this.setState({ allSuggestions: list });
        }

        if (this.props.districts && this.props.districts.allCodes && this.props.districts.allCodes.length > 0) {
            const list = this.props.districts.allCodes.map(code => {
                return ({
                    label: this.props.districts.byCode[code].name,
                    code: this.props.districts.byCode[code].code,
                    text: this.props.districts.byCode[code].name + ', '
                        + this.props.districts.byCode[code].sn_name + ', '
                        + this.props.districts.byCode[code].tm_name,
                })
            });
            this.setState({ allSuggestions: list });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.institutions !== prevProps.institutions && this.props.institutions.allCodes.length > 0) {
            const list = this.props.institutions.allCodes.map(code => {
                return ({
                    label: this.props.institutions.byCode[code].name,
                    code: this.props.institutions.byCode[code].code,
                    text: this.props.institutions.byCode[code].name + ', '
                        + this.props.institutions.byCode[code].sn_name + ', '
                        + this.props.institutions.byCode[code].tm_name,
                })
            });
            this.setState({ allSuggestions: list });
        }
        if (this.props.districts && this.props.districts !== prevProps.districts && this.props.districts.allCodes.length > 0) {
            const list = this.props.districts.allCodes.map(code => {
                return ({
                    label: this.props.districts.byCode[code].name,
                    code: this.props.districts.byCode[code].code,
                    text: this.props.districts.byCode[code].name + ', '
                        + this.props.districts.byCode[code].sn_name + ', '
                        + this.props.districts.byCode[code].tm_name,
                })
            });
            this.setState({ allSuggestions: list });
        }

    }

    getSuggestionValue(suggestion) {
        return suggestion;
    }

    getSuggestions(value) {
        const inputValue = deburr(value.trim()).toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0
            ? []
            : this.state.allSuggestions.filter((suggestion) => {
                return suggestion.label.toLowerCase().includes(inputValue);
            });
    }

    handleSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value),
        });
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    handleChange = () => (event, { newValue }) => {
        if (newValue && newValue.code) {
            this.props.onChange(newValue.code);
            this.setState({
                value: newValue.text,
            });
        } else {
            this.props.onChange(null);
            this.setState({
                value: newValue,
            });
        }
    };

    render() {
        const { classes } = this.props;

        const autosuggestProps = {
            renderInputComponent,
            suggestions: this.state.suggestions,
            onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
            getSuggestionValue: this.getSuggestionValue,
            renderSuggestion,
        };

        return (
            <Autosuggest
                {...autosuggestProps}
                inputProps={{
                    classes,
                    placeholder: this.props.institutions ? 'Type in the institution name to select' : 'Type in the district name to select',
                    value: this.state.value,
                    onChange: this.handleChange(),
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
    districts: PropTypes.array,
    onChange: PropTypes.func,
};

export default withStyles(styles)(AutosuggestInput);
