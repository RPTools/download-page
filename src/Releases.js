import React from "react";
import Download from "./Download"

const Releases = ({ release, index, showPre, downloadType, tool }) => {
    if (release.assets.length === 0) {
        return "";
    }

    if (showPre || !release.prerelease) {

        let releaseDate = new Date(release.published_at).toLocaleString(undefined, {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        });

        const tagName = release.tag_name;
        const toolImage = tool == 'TokenTool' ? 'images/RPTools-Token-Logo.png' : 'images/RPTools-Map-Logo.png';

        const releaseNoteLink = 'https://github.com/RPTools/' + tool + '/blob/' + tagName + '/CHANGE_LOG.md';
        return (

            <div>
                <div className="release-img"><img src={toolImage}/></div>
                <div className="release-name">{release.name !== "" ? release.name.replace("Release", tool) : "MapTool " + release.tag_name}</div>
                <div>
                    <div className="published-date">{releaseDate}</div>
                    <a className="release-notes" href={releaseNoteLink}>release notes</a>
                </div>
                <div>
                    {
                        release.assets.map((download, index) =>
                            <Download download={download} index={index} key={download.id} downloadType={downloadType} tagName={tagName}/>
                        )
                    }
                </div>
            </div>
        );
    } else {
        return "";
    }
};


export default Releases;