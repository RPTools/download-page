import React, { Component } from 'react';
import { render } from 'react-dom';
import GitHubReleases from './GitHubReleases';

const App = () =>
    <div>
        <h1>Test React App</h1>
        <GitHubReleases/>
    </div>;

render(<App/>, document.getElementById('root'));



