import React from 'react';
import {Search} from "../../index";

export default {
    title: 'Shared/Search',
    component: Search
};

const Template = (args) => <Search {...args} />;

export const Default = Template.bind({});

Default.args = {
    placeholder: "Rechercher un cocktail...",
    value: null,
    onChange: null
};

export const WithValue = Template.bind({});

WithValue.args = {
    placeholder: "Rechercher un cocktail...",
    value: "ABC",
    onChange: null
};