import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IntercomAPI } from 'react-intercom';
import FontAwesome from 'react-fontawesome';
import Locales from '../../strings';
import MainPageHeader from '../Home/components/Header';
import { requestDefaultRevision, requestExampleSets } from '../../redux/problemList/actions';
import googleAnalytics from '../../scripts/googleAnalytics';
import pageIndex from './styles.scss';
import { stopEvent, passEventForKeys } from '../../services/events';

const shareOnTwitter = shareCode => (e) => {
    window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${Locales.strings.share_with_teachers_text} ${window.location.origin}/#/app/problemSet/view/${shareCode}`)}`, '_blank',
    );
    return stopEvent(e);
};


class Index extends Component {
    componentDidMount() {
        this.props.requestDefaultRevision();
        this.props.requestExampleSets();
    }

    openExampleProblem = () => {
        const { props } = this;
        const { problemList } = props;
        props.history.push(`/app/problemSet/view/${problemList.defaultRevisionCode}`);
        googleAnalytics('premade set - default');
        IntercomAPI('trackEvent', 'view-example-set');
    }

    openPremadeSet = problemSet => () => {
        this.openByShareCode(problemSet.shareCode);
        googleAnalytics(`premade set - ${problemSet.title}`);
    }

    openByShareCode = (shareCode) => {
        this.props.history.push(`/app/problemSet/view/${shareCode}`);
    }

    duplicateProblemSet = problemSet => (e) => {
        this.props.duplicateProblemSet(e, problemSet);
        return stopEvent(e);
    }

    render() {
        const { props } = this;
        const { problemList } = props;
        return (
            <div>
                <MainPageHeader
                    {...props}
                    editing={false}
                    history={props.history}
                    addProblemSetCallback={props.addProblemSet}
                    finishEditing={props.finishEditing}
                    editCode={problemList.set.editCode}
                    action={null}
                />
                <div id="mainContainer" className="mainContainer">
                    <ol className={pageIndex.problemSetList}>
                        <li className="card">
                            <button
                                type="button"
                                className="btn d-flex"
                                onClick={props.addProblemSet}
                                onKeyPress={passEventForKeys(props.addProblemSet)}
                            >
                                <span className="centreText">+ New Problem Set</span>
                            </button>
                        </li>
                        <li className="card">
                            <button
                                type="button"
                                className="btn d-flex"
                                onClick={this.openExampleProblem}
                                onKeyPress={passEventForKeys(this.openExampleProblem)}
                                role="link"
                            >
                                <span className="centreText">Example Problem</span>
                            </button>
                        </li>
                    </ol>

                    <div className="title">Pre-made Sets</div>
                    <ol className={pageIndex.problemSetList}>
                        {problemList.exampleProblemSets.filter(exampleProblemSet => exampleProblemSet.title !== 'Example Problem Set').map((exampleProblemSet, index) => (
                            <li className="card" key={index}>
                                <button
                                    type="button"
                                    className="btn d-flex"
                                    onClick={this.openPremadeSet(exampleProblemSet)}
                                    onKeyPress={
                                        passEventForKeys(this.openPremadeSet(exampleProblemSet))
                                    }
                                    role="link"
                                >
                                    <span className={pageIndex.title}>
                                        {exampleProblemSet.title}
                                    </span>
                                    <span className={pageIndex.meta}>
                                        {exampleProblemSet.problems.length}
                                        {' '}
                                        Problems
                                    </span>
                                    <div className="dropdown">
                                        <button
                                            className={`btn dropdown-toggle ${pageIndex.problemSetDropdown}`}
                                            type="button"
                                            id={`dropdownMenuButton-${index}`}
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                            onClick={(e) => {
                                                stopEvent(e);
                                            }}
                                        >
                                            <FontAwesome
                                                name="ellipsis-v"
                                            />
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <button
                                                className="dropdown-item reset-btn"
                                                onClick={this.duplicateProblemSet(
                                                    exampleProblemSet,
                                                )}
                                                onKeyPress={
                                                    passEventForKeys(
                                                        this.duplicateProblemSet(
                                                            exampleProblemSet,
                                                        ),
                                                    )
                                                }
                                                type="button"
                                            >
                                                <FontAwesome
                                                    size="lg"
                                                    name="copy"
                                                />
                                                {` ${Locales.strings.duplicate_set}`}
                                                <span className="sROnly">
                                                    {'\u00A0'}
                                                    {Locales.strings.opens_in_new_tab}
                                                </span>
                                            </button>
                                            <button
                                                className="dropdown-item reset-btn"
                                                onClick={shareOnTwitter(
                                                    exampleProblemSet.shareCode,
                                                )}
                                                onKeyPress={passEventForKeys(shareOnTwitter(
                                                    exampleProblemSet.shareCode,
                                                ))}
                                                type="button"
                                            >
                                                <FontAwesome
                                                    size="lg"
                                                    name="twitter"
                                                />
                                                {` ${Locales.strings.share_with_teachers}`}
                                                <span className="sROnly">
                                                    {'\u00A0'}
                                                    {Locales.strings.opens_in_new_window}
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </button>
                            </li>
                        ))}

                    </ol>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        problemList: state.problemList,
    }),
    { requestDefaultRevision, requestExampleSets },
)(Index);
