import React, { Component } from 'react';
import axios from 'axios';
import Releases from './Releases';
import DownloadType from './DownloadType';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';




export default class GitHubReleases extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mapToolReleases: [],
            tokenToolToolReleases: [],
            tool: '',
            loading: true,
            error: null,
            showPre: false,
            downloadType: DownloadType.ALL
        };
    }

    componentWillMount() {
        axios.all([
                axios.get(`https://api.github.com/repos/rptools/maptool/releases`),
                axios.get(`https://api.github.com/repos/rptools/tokentool/releases`)
            ])
            .then(axios.spread((maptool, tokentool) => {
                const mapToolReleases = maptool.data;
                const tokenToolReleases = tokentool.data;
                this.setState({
                    mapToolReleases,
                    tokenToolReleases,
                    loading: false
                })
            }))
            .catch(error => {
                this.setState({
                    error: error,
                    loading: false,
                });
            });
    }

    setTool = ({ match }) => {
        console.log(match);
        return '';
    };

    handleDownloadTypeChange = (event) => {
        this.setState({ downloadType: event.target.value })
    };

    handlePreChange = (event) => {
        const value = event.target.checked;
        this.setState( { showPre: value })
    };



    releaseList = (route) => {
        const tool = route.match.params.tool;
        const releases = tool === 'TokenTool' ? this.state.tokenToolReleases : this.state.mapToolReleases;

        return (
            <div>
                <h2>{tool} Releases</h2>
                <div className="release-download-type">
                    <select value={this.state.downloadType} name='Download Type' onChange={this.handleDownloadTypeChange}>
                        <option value={DownloadType.ALL}>{DownloadType.ALL}</option>
                        <option value={DownloadType.JAR}>{DownloadType.JAR}</option>
                        <option value={DownloadType.LINUX}>{DownloadType.LINUX}</option>
                        <option value={DownloadType.MAC}>{DownloadType.MAC}</option>
                        <option value={DownloadType.WINDOWS}>{DownloadType.WINDOWS}</option>
                    </select>
                </div>
                <div className="release-download-prerelease">
                <label>Include Prerelease</label>
                    <input name='Include Prerelease' type='checkbox' checked={this.state.showPre} onChange={this.handlePreChange}/>
                </div>
                <li className='release-list'>
                    {releases.map((release, index) =>
                        <Releases release={release} index={index} key={release.id} showPre={this.state.showPre}
                                  downloadType={this.state.downloadType} tool={route.match.params.tool}
                        />,
                    )}
                </li>
            </div>
        );
    };

    renderLoading() {
        return (
            <div>
                Loading...
            </div>
        );
    }

    renderError() {
        return (
            <div>
                <div>
                    Sorry, an error occurred: {this.state.error.response.data.message}
                </div>
            </div>
        );
    }

    renderList() {
        const { error, mapToolReleases, tokenToolReleases } = this.state;

        if (error) {
            console.log(error);
            return this.renderError();
        }

        return (
            <Router>
                <div>
                    <Route path='/:tool' component={this.releaseList} />
                    <ul>
                        <li><Link to='/MapTool'>MapTool</Link></li>
                        <li><Link to='/TokenTool'>TokenTool</Link></li>
                    </ul>
                </div>
            </Router>
        );
    }

    render() {
        return this.state.loading ? this.renderLoading() : this.renderList();
    }
}
