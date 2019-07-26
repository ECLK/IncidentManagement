import React from 'react';
import { storiesOf } from '@storybook/react';
import EventTrail from '../components/EventTrail';
import Comment from "../components/EventTrail/Comment";

const events = [
    {
        id: 1234,
        label: 'modified post "Hello World"',
        createdAt: '2019-01-10T17:15:56.000Z',
        author: {
            name: 'John Doe',
            email: 'jitewaboh@lagify.com',
        },
    },
    {
        id: 1233,
        label: 'created new post "Hello World"',
        createdAt: '2019-01-10T16:34:00.000Z',
        author: {
            name: 'John Doe',
            email: 'jitewaboh@lagify.com',
        },
    },
    {
        id: 1232,
        label:
            'commented "I don\'t agree. You should never try to do things this way, or you\'ll end up in a bad place."',
        createdAt: '2019-01-09T15:53:56.000Z',
        author: {
            name: 'Lela Feng',
            email: 'lelafeng@example.com',
        },
    },
    {
        id: 1231,
        label: 'deleted comment "Totally."',
        createdAt: '2019-01-09T11:04:56.000Z',
        author: {
            name: 'Brandon Hood',
            email: 'brandon@example.com',
        },
    },
    {
        id: 1230,
        label: 'liked "Lorem Ipsum"',
        createdAt: '2019-01-09T09:12:56.000Z',
    },
];

storiesOf('EventTrail', module)
    .add('basic', () => (
        <EventTrail events={events.slice(0, -1)} total={5} />
    ))
    .add('load more', () => <EventTrail events={events} />)
    .add('comment', ()=>(<Comment/>))
