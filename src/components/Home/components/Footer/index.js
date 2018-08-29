import React, {Component} from "react";
import footer from './styles.css';
import styles from '../../../../styles/styles.css';
import Locales from '../../../../strings'

export default class MainPageFooter extends Component {
    render() {
      return (
        <div id="footer" className="{footer.footer}">
            <footer className={footer.footer}>
                <h2 className={styles.sROnly}> {Locales.strings.footer} </h2>
                <div className={footer.edGov}>
                    <a href="https://www2.ed.gov/about/offices/list/osers/osep/index.html" target="_blank">
                        <img className={footer.edGovImg}
                            src="/src/images/IDEA-logo.gif" alt={Locales.strings.idea_logo_alt} height="50"/>
                    </a>
                </div>
                <div className={footer.footerText}>
                    The <a href="http://diagramcenter.org/" target="_blank">{Locales.strings.diagram_center}</a>{Locales.strings.is_a}<a
                        href="http://www.benetech.org/"
                        target="_blank">{Locales.strings.benetech}</a>
                    &nbsp; {Locales.strings.footer_description}
                </div>
                <div className={footer.benetech}>
                    <a href="https://www.benetech.org/" target="_blank">
                        <img className={footer.benetechImg}
                            src="/src/images/benetech_logo_transparent.gif" alt="Benetech Logo" height="50"/>
                    </a>
                </div>
            </footer>
        </div>
      );
    }
  }