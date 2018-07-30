import React, {Component} from "react";
import classNames from "classnames";
import header from './styles.css';
import mySteps from '../../../../styles.css';
import styles from '../../../../../../styles/styles.css';
import Locales from '../../../../../../strings.js'

export default class MyStepsHeader extends Component {
    render() {
        return (
            <div className={header.container}>
                <h2 id="MySteps" tabIndex="-1">
                    <span className={classNames(mySteps.modalAreaHeading, header.title)} aria-hidden="true">
                        {Locales.strings.my_steps}
                    </span>
                    <span className={styles.sROnly}>{Locales.strings.my_steps}</span>
                </h2>
            </div>
        );
    }
}
