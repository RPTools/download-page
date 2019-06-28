import React from 'react';
import DownloadType from './DownloadType';

const ButtonImageMapping = {
    'deb': 'images/download-button-linux.png',
    'jar': 'images/download-button-jar.png',
    'exe': 'images/download-button-windows.png',
    'dmg': 'images/download-button-macos-dmg.png'
};

const PlatformMapping = {
    'deb': 'Linux',
    'jar': 'Java Jar',
    'exe': 'Windows',
    'dmg': 'Mac Os'
};



const Download = ({ download, index, downloadType }) => {
    let show = false;

    switch (downloadType) {
        case DownloadType.JAR:
            if (download.name.endsWith('.jar')) {
                show = true;
            }
            break;
        case DownloadType.LINUX:
            if (download.name.endsWith('.deb')) {
                show = true;
            }
            break;
        case DownloadType.MAC:
            if (download.name.endsWith('.pkg')) {
                show = true;
            } else if (download.name.endsWith('.dmg')) {
                show = true;
            }
            break;
        case DownloadType.WINDOWS:
            if (download.name.endsWith('.exe')) {
                show = true;
            }
            break;
        default: /* ALL */
            show = true;
            break;
    }

    if (show) {
        const downloadLink = download.browser_download_url;
        const ext = downloadLink.substr(downloadLink.lastIndexOf('.') + 1);
        const imagePath = ButtonImageMapping[ext];
        const downloadPlatform = PlatformMapping[ext];

        return (
            <div className='download-details'>
                <div className='download-url'>
                    <a href={downloadLink}>
                        <img id={'button-' + download.id} src={imagePath}/>
                        <div>
                            <label htmlFor={'button-' + download.id}>
                                {downloadPlatform}
                            </label>
                        </div>
                    </a>
                    <div className='download-count'>{download.download_count} Downloads</div>
                </div>
            </div>
        );
    } else {
        return '';
    }
};

export default Download;