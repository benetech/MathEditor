import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NotificationContainer } from 'react-notifications';
import {
    Switch, Route, withRouter,
} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faSignature, faSquareRootAlt,
} from '@fortawesome/free-solid-svg-icons';
import * as dayjs from 'dayjs';
import Intercom, { IntercomAPI } from 'react-intercom';
import PageIndex from './PageIndex';
import NotFound from './NotFound';
import Home from './Home';
import Editor from './Editor';
import LandingPage from './LandingPage';
import Privacy from './Privacy';
import Partners from './Partners';
import MainPageFooter from './Home/components/Footer';
import SocialFooter from './Home/components/SocialFooter';
import SiteMapFooter from './Home/components/SiteMapFooter';
import Locales from '../strings';
import ModalContainer, {
    CONFIRMATION, CONFIRMATION_BACK, PALETTE_CHOOSER, // ADD_PROBLEM_SET,
    EDIT_PROBLEM, SHARE_SET, VIEW_SET,
} from './ModalContainer';
import { alertWarning } from '../scripts/alert';
import googleAnalytics from '../scripts/googleAnalytics';
import { FRONTEND_URL } from '../config';
import problemListActions from '../redux/problemList/actions';
import problemActions from '../redux/problem/actions';
import { compareStepArrays } from '../redux/problem/helpers';

const mathLive = process.env.MATHLIVE_DEBUG_MODE ? require('../../mathlive/src/mathlive.js').default
    : require('../lib/mathlivedist/mathlive.js');

class App extends Component {
    constructor(props) {
        super(props);
        this.initializeIcons();
    }

    shouldComponentUpdate() {
        return true;
    }

    initializeIcons = () => {
        library.add(faSignature, faSquareRootAlt);
    }


    addProblem = (imageData, text, index, newProblemSet) => {
        if (!this.validateProblem(text, imageData)) {
            return false;
        }
        IntercomAPI('trackEvent', 'create-a-problem');
        this.props.addProblem(imageData, text, index, newProblemSet);
        return true;
    }

    validateProblem = (text, image) => {
        const {
            problemList,
        } = this.props;
        let message;
        if (text === '' || $.trim(text).length === 0) {
            if (problemList.theActiveMathField.latex() === '' && image === null) {
                message = Locales.strings.no_problem_equation_or_image_and_title_warning;
            } else {
                message = Locales.strings.no_problem_title_warning;
            }
        } else if (problemList.theActiveMathField.latex() === '' && image === null) {
            message = Locales.strings.no_problem_equation_or_image_warning;
        }

        if (message) {
            alertWarning(message, Locales.strings.warning);
            setTimeout(() => {
                $('#mathAnnotation').focus();
            }, 6000);
            return false;
        }
        return true;
    }

    deleteProblem = () => {
        this.props.deleteProblem();
        setTimeout(() => {
            mathLive.renderMathInDocument();
        }, 200);
        this.props.toggleModals([CONFIRMATION]);
    }

    editProblem = (imageData, title) => {
        if (!this.validateProblem(title, imageData)) {
            return;
        }
        this.props.editProblem(imageData, title);
        setTimeout(() => {
            mathLive.renderMathInDocument();
        }, 200);
        this.props.toggleModals([EDIT_PROBLEM]);
    }

    updatePositions = (problems) => {
        const updatedProblems = problems.map((problem, position) => ({
            ...problem,
            position,
        }));
        this.props.saveProblems(updatedProblems);
    }

    addProblemSet = () => {
        this.props.toggleModals([PALETTE_CHOOSER]);
        googleAnalytics('new problem set button');
        IntercomAPI('trackEvent', 'create-a-set');
    }

    progressToAddingProblems = (palettes) => {
        if (palettes.length === 0) {
            alertWarning(Locales.strings.no_palettes_chosen_warning, Locales.strings.warning);
            return;
        }
        this.props.setTempPalettes(palettes);
        // this.props.toggleModals([PALETTE_CHOOSER, ADD_PROBLEM_SET]);
        this.props.toggleModals([PALETTE_CHOOSER]);
        this.props.history.push('/app/problemSet/new');
        this.props.saveProblemSet([], `New Problem Set ${dayjs().format('MM-DD-YYYY')}`, null);
    }

    saveProblemSet = (orderedProblems, title) => {
        googleAnalytics(Locales.strings.add_problem_set);
        this.props.saveProblemSet(orderedProblems, title);
    }

    // finishEditing = () => {
    //     const {
    //         set,
    //     } = this.props.problemList;
    //     this.props.history.push(`/app/problemSet/view/${set.shareCode}`);
    // }

    saveProblem = () => new Promise((resolve) => {
        if (this.props.example) {
            this.props.updateProblemStore({ editLink: Locales.strings.example_edit_code });
            resolve(true);
        } else {
            googleAnalytics('Save Problem');
            this.props.commitProblemSolution();
        }
    })

    finishProblem = () => {
        this.props.commitProblemSolution(true);
    }

    shareProblem = () => {
        if (this.props.example) {
            this.props.updateProblemStore({
                shareLink: Locales.strings.example_share_code,
            });
            this.props.toggleModals([SHARE_SET]);
        } else {
            googleAnalytics('Share Problem');
            this.props.updateProblemSolution(this.props.problemStore.solution);
            this.props.commitProblemSolution(false, true);
        }
    }

    viewProblem = () => {
        this.props.toggleModals([VIEW_SET]);
    }

    saveProblemCallback = () => {
        this.props.toggleModals([CONFIRMATION_BACK]);
        this.saveProblem();
    }

    goBack = () => {
        const { problemStore } = this.props;
        if (!compareStepArrays(problemStore.solution.steps, problemStore.stepsFromLastSave)
            && !this.props.example) {
            this.props.toggleModals([CONFIRMATION_BACK]);
        } else {
            this.props.history.goBack();
        }
    }

    render() {
        const commonProps = this.props;
        const { modal, problemList, problemStore } = this.props;
        return (
            <React.Fragment>
                <NotificationContainer />
                <div className="body-container">
                    <ModalContainer
                        activeModals={modal.activeModals}
                        toggleModals={this.props.toggleModals}
                        updateProblemSetTitle={this.props.updateProblemSetTitle}
                        progressToAddingProblems={this.progressToAddingProblems}
                        deleteProblem={this.deleteProblem}
                        shareLink={problemStore.shareLink}
                        newSetShareLink={`${FRONTEND_URL}/app/problemSet/view/${problemList.newSetSharecode}`}
                        problemSetShareLink={`${FRONTEND_URL}/app/problemSet/review/${problemList.problemSetShareCode}`}
                        activateMathField={field => this.props.setActiveMathField(field)}
                        theActiveMathField={problemList.theActiveMathField}
                        addProblemCallback={this.addProblem}
                        problems={problemList.set.problems}
                        tempSet={problemList.tempSet}
                        saveProblemSet={this.saveProblemSet}
                        saveProblems={this.props.saveProblems}
                        problemToEdit={problemList.problemToEdit}
                        editProblemCallback={this.editProblem}
                        history={this.props.history}
                        updateTempSet={this.props.updateTempSet}
                        {...problemStore}
                        {...this}

                    />
                    <Switch>
                        <Route exact path="/app/problemSet/:action/:code?" render={p => <Home {...commonProps} {...p} {...this} />} />
                        <Route exact path="/app/problem/:action/:code" render={p => <Editor {...commonProps} {...p} {...this} />} />
                        <Route exact path="/app/problem/example" render={p => <Editor example {...commonProps} {...p} {...this} />} />
                        <Route exact path="/app" render={p => <PageIndex {...commonProps} {...p} {...this} />} />
                        <Route exact path="/" render={p => <LandingPage {...p} />} />
                        <Route exact path="/privacy" render={p => <Privacy {...p} />} />
                        <Route exact path="/partners" render={p => <Partners {...p} />} />
                        <Route render={p => <NotFound {...p} />} />
                    </Switch>
                </div>
                <Intercom
                    appID={process.env.INTERCOM_APP_ID}
                />
                <footer id="footer">
                    <SiteMapFooter />
                    <MainPageFooter customClass="footer" />
                    <SocialFooter />
                </footer>
            </React.Fragment>
        );
    }
}

export default withRouter(connect(
    state => ({
        problemList: state.problemList,
        problemStore: state.problem,
        modal: state.modal,
    }),
    {
        ...problemActions,
        ...problemListActions,
    },
)(App));
