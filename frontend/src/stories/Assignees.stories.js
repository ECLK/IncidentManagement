import React from 'react';
import { storiesOf } from '@storybook/react';
import AssigneeChip from '../components/Assignees/Chip';
import AutoComplete from '../components/Assignees/Autocomplete';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import Assignees from '../components/Assignees';
import AlertSnackbar, { CustomizedSnackbars } from '../components/Assignees/AlertSnackbar';

const users = [
    {
        name: "Clement Fernando",
        avatar: <Avatar>CF</Avatar>,
    },
    {
        name: "Elon Musk",
        avatar: <Avatar alt="Natacha" src="https://material-ui.com/static/images/avatar/1.jpg" />,
    },
    {
        name: "Richard Branson",
        avatar: <Avatar> <FaceIcon /> </Avatar>
    }
];

const suggestions = [
    { label: 'Afghanistan' },
    { label: 'Aland Islands' },
    { label: 'Albania' },
    { label: 'Algeria' },
    { label: 'American Samoa' },
    { label: 'Andorra' },
    { label: 'Angola' },
    { label: 'Anguilla' },
    { label: 'Antarctica' },
    { label: 'Antigua and Barbuda' },
    { label: 'Argentina' },
    { label: 'Armenia' },
    { label: 'Aruba' },
    { label: 'Australia' },
    { label: 'Austria' },
    { label: 'Azerbaijan' },
    { label: 'Bahamas' },
    { label: 'Bahrain' },
    { label: 'Bangladesh' },
    { label: 'Barbados' },
    { label: 'Belarus' },
    { label: 'Belgium' },
    { label: 'Belize' },
    { label: 'Benin' },
    { label: 'Bermuda' },
    { label: 'Bhutan' },
    { label: 'Bolivia, Plurinational State of' },
    { label: 'Bonaire, Sint Eustatius and Saba' },
    { label: 'Bosnia and Herzegovina' },
    { label: 'Botswana' },
    { label: 'Bouvet Island' },
    { label: 'Brazil' },
    { label: 'British Indian Ocean Territory' },
    { label: 'Brunei Darussalam' },
].map(suggestion => ({
    value: suggestion.label,
    label: suggestion.label,
}));

const alert = {
    variant: "error",
    message: "This user assigned already!",
    open: true,
}

storiesOf('Assignees', module)
    .add('Chip', () => (
        <AssigneeChip users={users} />
    ))
    .add('AutoComplete', () => (
        <AutoComplete suggestions={suggestions} />
    ))
    .add('Assginee', () => (
        <Assignees />
    ))
    .add('AlertSnackbar', () => (
        <AlertSnackbar alert={alert} />
    ));
