import React, { Component } from 'react';
import { render } from 'react-dom';
import GitHubReleases from './GitHubReleases';
import './styles.css';

const App = () =>
    <div>
        <GitHubReleases/>
    </div>;

render(<App/>, document.getElementById('root'));


