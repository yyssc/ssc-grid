import React from 'react';
import packageJSON from '../../package.json';

let version = packageJSON.version;

if (/docs/.test(version)) {
  version = version.split('-')[0];
}

const PageFooter = React.createClass({
  render() {
    return (
        <footer className="bs-docs-footer" role="contentinfo">
          <div className="container">
            {/* <div className="bs-docs-social">
              <ul className="bs-docs-social-buttons">
                <li>
                  <iframe className="github-btn"
                    src="https://ghbtns.com/github-btn.html?user=yyssc&repo=ssc-grid&type=watch&count=true"
                    width={95}
                    height={20}
                    title="Star on GitHub" />
                </li>
                <li>
                  <iframe className="github-btn"
                    src="https://ghbtns.com/github-btn.html?user=yyssc&repo=ssc-grid&type=fork&count=true"
                    width={92}
                    height={20}
                    title="Fork on GitHub" />
                </li>
              </ul>
            </div> */}
            <p>Code licensed under <a href="https://github.com/yyssc/ssc-grid/blob/master/LICENSE" target="_blank">MIT</a>.</p>
            <ul className="bs-docs-footer-links muted">
              <li>最新版 v{version}</li>
              <li>·</li>
              <li><a href="https://github.com/yyssc/ssc-grid/">GitHub</a></li>
              <li>·</li>
              <li><a href="https://github.com/yyssc/ssc-grid/issues?state=open">Issues</a></li>
              <li>·</li>
              <li><a href="https://github.com/yyssc/ssc-grid/releases">Releases</a></li>
            </ul>
          </div>
        </footer>
      );
  }
});

export default PageFooter;
