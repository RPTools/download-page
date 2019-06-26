import React, { Component } from 'react';
import axios from 'axios';


const Release = ({ release, index }) =>
    <tr>
        <td>{index + 1}</td>
        <td className="release-name">{release.name}</td>
        <td>{release.tag_name}</td>
        <td>{release.draft ? "draft" : ""}</td>
        <td>{release.published_at}</td>
        <td>{release.prerelease ? "pre-release" : ""}</td>
    </tr>;

export default class GitHubReleases extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            releases: [],
            loading: true,
            error: null,
        };
    }

    componentDidMount() {
        axios
            .get(
                window.encodeURI(
                        `https://api.github.com/repos/rptools/maptool/releases`
                ),
            )
            .then(response => {
                console.log(response);
                const releases = response.data;
                this.setState({
                    releases,
                    loading: false,
                });
            })
            .catch(error => {
                this.setState({
                    error: error,
                    loading: false,
                });
            });
    }

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
        const { error, releases } = this.state;

        if (error) {
            console.log(error);
            return this.renderError();
        }

        return (
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Index</th>
                    <th>Name</th>
                    <th>Prerelease</th>
                </tr>
                </thead>
                <tbody>
                {releases.map((release, index) =>
                    <Release release={release} index={index} key={release.id} />,
                )}
                </tbody>
            </table>
        );
    }

    render() {
        return this.state.loading ? this.renderLoading() : this.renderList();
    }
}
