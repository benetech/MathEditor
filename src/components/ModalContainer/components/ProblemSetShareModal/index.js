import React, { Component } from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import AriaModal from 'react-aria-modal';
import classNames from 'classnames';
import { IntercomAPI } from 'react-intercom';
import FontAwesome from 'react-fontawesome';
import editor from './styles.scss';
import Locales from '../../../../strings';
import Button from '../../../Button';
import { passEventForKeys } from '../../../../services/events';
import googleClassroomIcon from '../../../../../images/google-classroom-icon.png';
import msTeamIcon from '../../../../../images/ms-team-icon.svg';
import googleAnalytics from '../../../../scripts/googleAnalytics';
import { alertSuccess } from '../../../../scripts/alert';

export default class ProblemSetShareModal extends Component {
    componentWillMount() {
        const { isSolutionSet, shareLink } = this.props;
        if (!isSolutionSet && shareLink) {
            googleAnalytics(Locales.strings.share_problem_set);
        }
    }

    copyShareLink = () => {
        const el = document.createElement('textarea');
        el.textContent = this.props.shareLink;
        el.setAttribute('readonly', '');
        document.getElementById('ProblemSetShareModal').appendChild(el);
        el.select();
        document.execCommand('copy');
        document.getElementById('ProblemSetShareModal').removeChild(el);
        alertSuccess(Locales.strings.successfully_copied, Locales.strings.success);
    }

    shareOnGoogleClassroom = (e) => {
        const {
            problemList,
        } = this.props;
        const { action } = this.getParams();
        e.preventDefault();
        const popupConfig = 'height=400,width=641,top=100,left=100,target=classroomPopup,toolbar=yes,scrollbars=yes,menubar=yes,location=no,resizable=yes';
        if (action === 'edit') {
            window.open(
                `https://classroom.google.com/u/0/share?url=${encodeURIComponent(`${this.getShareUrl()}`)}&title=${problemList.set.title}`,
                'googleClassroom',
                popupConfig,
            );
            IntercomAPI('trackEvent', 'assign-a-set-google-classroom');
        } else if (action === 'view' || action === 'solve') {
            window.open(
                `https://classroom.google.com/u/0/share?url=${encodeURIComponent(this.getShareUrl())}`,
                'googleClassroom',
                popupConfig,
            );
            IntercomAPI('trackEvent', 'submit-problem-set-google-classroom');
        }
        this.props.deactivateModal();
    }

    shareOnMicrosoftTeams = () => {
        const { action } = this.getParams();
        const popupConfig = 'height=578,width=700,top=100,left=100,target=msTeamPopup,toolbar=yes,scrollbars=yes,menubar=yes,location=no,resizable=yes';
        window.open(
            `https://teams.microsoft.com/share?href=${encodeURIComponent(this.getShareUrl())}&preview=true&referrer=${window.location.hostname}`,
            'microsoftTeam',
            popupConfig,
        );
        if (action === 'edit') {
            IntercomAPI('trackEvent', 'assign-a-set-microsoft-team');
        } else if (action === 'view' || action === 'solve') {
            IntercomAPI('trackEvent', 'submit-problem-set-microsoft-team');
        }
        this.props.deactivateModal();
    }

    getShareUrl = () => {
        const {
            problemList,
        } = this.props;
        const { action } = this.getParams();
        if (action === 'edit') {
            return `${window.location.origin}/#/app/problemSet/view/${problemList.set.shareCode}`;
        } if (action === 'view' || action === 'solve') {
            return `${window.location.origin}/#/app/problemSet/review/${problemList.problemSetShareCode}`;
        }
        return '';
    }

    getParams = () => {
        const path = window.location.hash.substr(1);
        const params = path.split('/app/problemSet/')[1].split('/');
        return {
            action: params[0],
            code: params[1],
        };
    }

    render() {
        const { isSolutionSet, problemList } = this.props;
        const currentSet = problemList.set;
        let message = '';
        let header = '';
        let iconName = '';
        let messageList = [];
        if (isSolutionSet) {
            message = Locales.strings.submit_your_answers;
            header = Locales.strings.share_my_answers;
            iconName = 'check-circle';
            messageList = [
                Locales.strings.allow_others_to_see,
                Locales.strings.your_work_cannot,
                Locales.strings.problem_set_cannot_be_duplicated,
            ];
        } else {
            message = Locales.strings.share_your_problem_set;
            header = Locales.strings.share_problem_set;
            iconName = 'share';
            messageList = [
                Locales.strings.allow_students_to_see,
                Locales.strings.allow_educators_to_duplicate,
            ];
        }
        return (
            <AriaModal
                titleId="shareModal"
                onExit={this.props.deactivateModal}
                getApplicationNode={this.getApplicationNode}
                underlayStyle={{ paddingTop: '2em' }}
            >
                <div id="ProblemSetShareModal" className={editor.modal}>
                    <div className={editor.modalBody}>
                        <h3>
                            <FontAwesome
                                size="md"
                                name={iconName}
                            />
                            {header}
                        </h3>
                        <ul className={editor.messageList}>
                            {messageList.map((messageListItem, mIndex) => (
                                <li key={mIndex}>{messageListItem}</li>
                            ))}
                        </ul>
                        <div className={editor.modalMessage}>
                            <p>{message}</p>
                        </div>
                        <div className="row">
                            <div className={classNames('col-6', editor.shareContainer)}>
                                <Button
                                    id="copy_button"
                                    icon="link"
                                    className={classNames('btn', editor.button)}
                                    ariaHidden="false"
                                    type="button"
                                    content={Locales.strings.copy_link_url}
                                    onClick={() => this.copyShareLink()}
                                />
                            </div>
                            <div className={classNames('col-6', editor.externalButtons)}>
                                <span>
                                    <button
                                        id="googleContainer1"
                                        className={classNames([
                                            'btn',
                                            'btn-outline-dark',
                                            editor.buttonContainer,
                                            'pointer',
                                        ])}
                                        onClick={this.shareOnGoogleClassroom}
                                        onKeyPress={
                                            passEventForKeys(this.shareOnGoogleClassroom)
                                        }
                                        type="button"
                                    >
                                        <img src={googleClassroomIcon} alt="" />
                                        <span className={editor.btnText}>
                                            <span className="sROnly">
                                                {Locales.strings.share_on}
                                            </span>
                                            {Locales.strings.google_classroom}
                                            <span className="sROnly">
                                                {'\u00A0'}
                                                {Locales.strings.opens_in_new_tab}
                                            </span>
                                        </span>
                                    </button>
                                    <UncontrolledTooltip placement="top" target="googleContainer1" />
                                </span>
                                <span>
                                    <button
                                        id="microsoftTeamContainer1"
                                        className={classNames([
                                            'btn',
                                            'btn-outline-dark',
                                            editor.buttonContainer,
                                            'pointer',
                                        ])}
                                        onClick={this.shareOnMicrosoftTeams}
                                        onKeyPress={
                                            passEventForKeys(this.shareOnMicrosoftTeams)
                                        }
                                        type="button"
                                    >
                                        <img
                                            src={msTeamIcon}
                                            alt=""
                                        />
                                        <span className={editor.btnText}>
                                            <span className="sROnly">
                                                {Locales.strings.share_on}
                                            </span>
                                            {Locales.strings.ms_team}
                                            <span className="sROnly">
                                                {'\u00A0'}
                                                {Locales.strings.opens_in_new_tab}
                                            </span>
                                        </span>
                                    </button>
                                    <UncontrolledTooltip placement="top" target="microsoftTeamContainer1" />
                                </span>
                                {(isSolutionSet && currentSet.partner
                                    && currentSet.partner.canSubmit) && (
                                    <Button
                                        id="partnerBtn"
                                        className={classNames([
                                            'btn',
                                            'btn-outline-dark',
                                            editor.integrationBtn,
                                        ])}
                                        type="button"
                                        content={Locales.strings.submit_to_partner.replace('{partner}', currentSet.partner.name)}
                                        onClick={() => {
                                            this.props.submitToPartner(
                                                currentSet.id,
                                                problemList.editCode,
                                                problemList.reviewCode,
                                            );
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={editor.modalFooter}>
                        <Button
                            id="deactivate"
                            className={classNames('btn', 'btn-primary')}
                            ariaHidden="false"
                            type="button"
                            icon="times"
                            content={Locales.strings.close}
                            onClick={this.props.deactivateModal}
                        />
                    </div>
                </div>
            </AriaModal>
        );
    }
}
