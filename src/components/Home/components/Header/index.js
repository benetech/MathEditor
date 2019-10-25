import React from 'react';
import { IntercomAPI } from 'react-intercom';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { UncontrolledTooltip } from 'reactstrap';
import classNames from 'classnames';
import header from './styles.scss';
import UpcomingMobile from '../UpcomingMobile';
import Locales from '../../../../strings';
import {
    toggleModals,
} from '../../../../redux/problemList/actions';
import {
    openTour,
} from '../../../../redux/problem/actions';
import {
    logoutOfUserProfile,
    setAuthRedirect,
} from '../../../../redux/userProfile/actions';
import googleAnalytics from '../../../../scripts/googleAnalytics';
import logo from '../../../../../images/mathshare_logo_white.png';
import {
    focusOnMainContent,
    stopEvent,
    passEventForKeys,
} from '../../../../services/events';


class MainPageHeader extends React.Component {
    componentDidMount() {
        this.logoutClickHandler();
    }

    componentDidUpdate() {
        this.logoutClickHandler();
    }

    logoutClickHandler = () => {
        document.querySelectorAll('li.avatar .dropdown-menu > *').forEach((node) => {
            node.addEventListener('click', e => stopEvent(e));
        });
        const logout = document.querySelector('li.avatar .dropdown-menu .logout');
        if (logout) {
            logout.addEventListener('click', this.props.logoutOfUserProfile);
        }
    }

    onClickTutorial = () => {
        googleAnalytics(Locales.strings.tutorial);
        setTimeout(() => {
            this.props.openTour();
        }, 100);
    }

    clickOnQuestion = () => {
        googleAnalytics('clicked help center');
        IntercomAPI('trackEvent', 'clicked-help-center');
    }

    openNewProblemSet = () => {
        window.open('/#/app/problemSet/new', '_blank');
    };

    setAuthRedirect = () => {
        this.props.setAuthRedirect('back');
    }

    render() {
        const { props } = this;
        const { userProfile } = props;
        const questionBtnId = 'navbarDropdownMenuLink-dropdown';

        return (
            <div id="topNavigationWrapper" className={header.header}>
                <header>
                    <nav
                        className={classNames(header.navbar, 'navbar-expand-lg', 'navbar')}
                        id="topNavigation"
                    >
                        <button
                            data-skip-link
                            onClick={focusOnMainContent}
                            onKeyPress={passEventForKeys(focusOnMainContent)}
                            type="button"
                        >
                            {Locales.strings.go_to_main_content}
                        </button>
                        <h2 id="topNavLabel" className="sROnly">{Locales.strings.header}</h2>
                        <div className={header.navbarBrandContainer}>
                            <a
                                className="navbar-brand"
                                href="#/app"
                                onClick={() => {
                                    googleAnalytics('clicked logo');
                                }}
                            >
                                <img src={logo} alt={Locales.strings.mathshare_benetech} height="37" />
                                <span className={header.beta}>{Locales.strings.beta}</span>
                            </a>
                        </div>
                        <div className="navbar-header pull-right">
                            <ul className="nav pull-left">
                                <li className="nav-item dropdown">
                                    <span id={`${questionBtnId}-label`} className="sROnly">{Locales.strings.help_center}</span>
                                    <button
                                        className={`nav-link dropdown-toggle btn ${header.dropDownMenu}`}
                                        id={questionBtnId}
                                        data-toggle="dropdown"
                                        type="button"
                                        aria-labelledby={`${questionBtnId}-label`}
                                        onClick={this.clickOnQuestion}
                                        onKeyPress={passEventForKeys(this.clickOnQuestion)}
                                        aria-expanded="false"
                                    >
                                        <FontAwesome
                                            size="lg"
                                            name="question"
                                        />
                                        <span className="sROnly">{Locales.strings.more_options}</span>
                                    </button>
                                    <UncontrolledTooltip placement="top" target={questionBtnId} />
                                    <ul
                                        className="dropdown-menu dropdown-menu-lg-right dropdown-secondary"
                                        aria-labelledby={`${questionBtnId}-label`}
                                    >
                                        {(props.action === 'new' || props.action === 'edit') && (
                                            <li>
                                                <button
                                                    className="dropdown-item reset-btn"
                                                    onClick={this.openNewProblemSet}
                                                    onKeyPress={
                                                        passEventForKeys(this.openNewProblemSet)
                                                    }
                                                    type="button"
                                                >
                                                    <FontAwesome
                                                        size="lg"
                                                        name="plus"
                                                    />
                                                    {` ${Locales.strings.add_problem_set}`}
                                                    <span className="sROnly">
                                                        {'\u00A0'}
                                                        {Locales.strings.opens_in_new_tab}
                                                    </span>
                                                </button>
                                            </li>
                                        )}
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="/#/app/problem/example"
                                                onClick={this.onClickTutorial}
                                                onKeyPress={passEventForKeys(this.onClickTutorial)}
                                                tabIndex={0}
                                            >
                                                <FontAwesome
                                                    className="super-crazy-colors"
                                                    name="hand-o-up"
                                                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                                />
                                                {Locales.strings.tutorial}
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="https://intercom.help/benetech/en"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={() => {
                                                    googleAnalytics('click help center');
                                                }}
                                            >
                                                <FontAwesome
                                                    className="super-crazy-colors"
                                                    name="comment"
                                                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                                />
                                                {Locales.strings.help_center}
                                                <span className="sROnly">
                                                    {'\u00A0'}
                                                    {Locales.strings.opens_in_new_window}
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://docs.google.com/forms/d/e/1FAIpQLScSZJo47vQM_5ci2MOgBbJW7WM6FbEi2xABR5qSZd8oD2RZEg/viewform?usp=sf_link"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="dropdown-item"
                                                onClick={() => {
                                                    googleAnalytics('click feedback');
                                                }}
                                            >
                                                <FontAwesome
                                                    className="super-crazy-colors"
                                                    name="arrow-circle-right"
                                                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                                />
                                                {Locales.strings.provide_feedback}
                                                <span className="sROnly">
                                                    {'\u00A0'}
                                                    {Locales.strings.opens_in_new_window}
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                {!userProfile.service && (
                                    <li>
                                        <a
                                            id="signIn"
                                            className={`nav-link btn ${header.signInLink}`}
                                            href="/#/signIn"
                                            onClick={this.setAuthRedirect}
                                            onKeyPress={passEventForKeys(this.setAuthRedirect)}
                                        >

                                            {Locales.strings.sign_in}
                                            <FontAwesome
                                                size="lg"
                                                name="user-circle-o"
                                            />
                                        </a>
                                        <UncontrolledTooltip placement="top" target="signIn" />
                                    </li>
                                )}
                                {userProfile.service && (
                                    <li className="nav-item avatar dropdown">
                                        <button
                                            className="nav-link dropdown-toggle reset-btn"
                                            id="navbarDropdownMenuLink-avatar"
                                            data-toggle="dropdown"
                                            type="button"
                                            aria-expanded="false"
                                        >
                                            <img
                                                src={userProfile.profileImage}
                                                className="rounded-circle z-depth-0"
                                                alt={Locales.strings.user_profile}
                                            />
                                        </button>
                                        <UncontrolledTooltip placement="top" target="navbarDropdownMenuLink-avatar" />
                                        <ul
                                            className="dropdown-menu dropdown-menu-lg-right dropdown-secondary"
                                            aria-labelledby="navbarDropdownMenuLink-avatar"
                                        >
                                            <li><div className="dropdown-header">{userProfile.name}</div></li>
                                            <li><div className={`dropdown-header ${header.email}`}>{userProfile.email}</div></li>
                                            <li><div className="dropdown-divider" /></li>
                                            <li>
                                                <button
                                                    className="dropdown-item logout reset-btn"
                                                    onClick={this.props.logoutOfUserProfile}
                                                    onKeyPress={
                                                        passEventForKeys(
                                                            this.props.logoutOfUserProfile,
                                                        )
                                                    }
                                                    type="button"
                                                >
                                                    {Locales.strings.sign_out}
                                                </button>

                                            </li>
                                        </ul>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </nav>
                    <UpcomingMobile />
                </header>
            </div>
        );
    }
}

export default connect(
    state => ({
        userProfile: state.userProfile,
    }),
    {
        toggleModals,
        openTour,
        setAuthRedirect,
        logoutOfUserProfile,
    },
)(MainPageHeader);
