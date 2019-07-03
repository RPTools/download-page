import React, { Component } from 'react';
import { render } from 'react-dom';
import GitHubReleases from './GitHubReleases';

const App = () =>
    <div>
        <GitHubReleases/>
    </div>;

render(<App/>, document.getElementById('root'));


