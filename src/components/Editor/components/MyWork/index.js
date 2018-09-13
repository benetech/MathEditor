import React, { Component } from "react";
import MyWorkEditorArea from './components/MyWorkEditorArea';
import MathPalette from './components/MathPalette';
import MyWorkEditorButtons from './components/MyWorkEditorButtons';
import classNames from "classnames";
import myWork from './styles.css';
import editor from '../../styles.css';
import Locales from '../../../../strings';
import Painterro from '../../../../lib/painterro/painterro.commonjs2';
import painterroConfiguration from './painterroConfiguration.json';

const mathLive = DEBUG_MODE ? require('../../../../../mathlive/src/mathlive.js')
    : require('../../../../lib/mathlivedist/mathlive.js');

export default class MyWork extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isScratchpadUsed: false,
            scratchpadMode: false,
            scratchpadContent: null
        }

        this.scratchPadPainterro;

        this.openScratchpad = this.openScratchpad.bind(this);
        this.hideScratchpad = this.hideScratchpad.bind(this);
        this.addStep = this.addStep.bind(this);
        this.updateStep = this.updateStep.bind(this);
        this.clearAndResizeScratchPad = this.clearAndResizeScratchPad.bind(this);
        this.scratchpadChangeHandler = this.scratchpadChangeHandler.bind(this);
        this.InitScratchPad = this.InitScratchPad.bind(this);
        this.displayScratchpadImage = this.displayScratchpadImage.bind(this);

        document.onkeydown = this.HandleKeyDown.bind(this);
    }

    componentDidMount() {
        if (this.props.bindDisplayFunction) {
            this.props.bindDisplayFunction((scratchpadContent) => {
                this.setState(
                    {scratchpadContent},
                    this.displayScratchpadImage
            )});
        }
    }

    HandleKeyDown(event) {
        var keyShortcuts = new Map(JSON.parse(sessionStorage.keyShortcuts));
        if (event.shiftKey && this.props.theActiveMathField.selectionIsCollapsed()) {
            // if an insertion cursor, extend the selection unless we are at an edge
            if (event.key === 'Backspace' && !this.props.theActiveMathField.selectionAtStart()) {
                this.props.theActiveMathField.perform('extendToPreviousChar');
    
            } else if (event.key === 'Delete' && !this.props.theActiveMathField.selectionAtEnd()) {
                this.props.theActiveMathField.perform('extendToNextChar');
            }
        }
        if (event.shiftKey && event.key === 'Enter' && $('#mathAnnotation').val() !== '') {
            event.preventDefault();
            if (this.props.editing || this.props.editingProblem) {
               this.updateStep();
            } else {
                this.addStep();
            }
        }
        if (event.shiftKey && event.key === 'Backspace' && this.props.showUndo && !this.props.addingProblem) {
            event.preventDefault();
            this.props.undoLastActionCallback();
        }
    
        var keys = [];
        if (event.shiftKey) {
            keys.push("Shift");
        }
        if (event.ctrlKey) {
            keys.push("Ctrl");
            if (event.key == " ") {
                this.props.theActiveMathField.perform(['insert', "\\\ "]);
            }
        }
        keys.push(event.key);
        var id = keyShortcuts.get(keys.sort().join(''));
        if (id) {
            $("#" + id).click();
        }
    }

    scratchpadChangeHandler() {
        if (!this.state.isScratchpadUsed) {
            this.setState({isScratchpadUsed: true});
        }
    }

    InitScratchPad() {
        painterroConfiguration.changeHandler = this.scratchpadChangeHandler;
        this.scratchPadPainterro = Painterro(painterroConfiguration);
        this.scratchPadPainterro.show();

        $('#scratch-pad-containter-bar > div > span').first()
            .append('<button id="clear-button" type="button" class="ptro-icon-btn ptro-color-control" title='+ "\"" +Locales.strings.clear_sketchpad + "\"" + '><i class="ptro-icon ptro-icon-close"></i></button>');
        $('#clear-button').click(() =>
            this.clearAndResizeScratchPad()
        );
        $('.ptro-icon-btn').css('border-radius', '.25rem');
        $('.ptro-bordered-btn').css('border-radius', '.5rem');
        $('.ptro-info').hide();

        this.setState({isScratchpadUsed: false});
    }

    displayScratchpadImage() {
        if (this.state.scratchpadMode) {
            this.clearAndResizeScratchPad(this.state.scratchpadContent);
            this.scratchPadPainterro.show(this.state.scratchpadContent);
        }
    }

    clearAndResizeScratchPad(content) {
        if (this.state.scratchpadMode) {
            this.scratchPadPainterro.clear();
            this.setState({
                isScratchpadUsed: false,
                scratchpadContent: content
            });
        }
    }

    openScratchpad() {
        this.setState(
            {scratchpadMode: true}, () => {
                $('#scratch-pad-containter').show();
                this.displayScratchpadImage();
            });
    }

    hideScratchpad() {
        this.setState({
            scratchpadMode: false,
            scratchpadContent: this.scratchPadPainterro.imageSaver.asDataURL()}, () => {
                $('#scratch-pad-containter').hide();
                mathLive.renderMathInDocument();
            });
    }

    addStep() {
        this.props.addStepCallback(this.state.isScratchpadUsed ? this.scratchPadPainterro.imageSaver.asDataURL() : null, this.props.textAreaValue);
    }

    updateStep() {
        this.props.updateCallback(this.state.isScratchpadUsed ? this.scratchPadPainterro.imageSaver.asDataURL() : null, this.props.textAreaValue);
    }

    render() {
        return (
            <div id="EditorArea" className={myWork.editorArea}>
                <div className={myWork.myWorkArea}>
                    <div id="historyWorkSeparator" className={myWork.historyWorkSeparator}>
                        <h2>
                            <span
                                className={classNames(
                                    editor.modalAreaHeading,
                                    myWork.marginTop)}
                                aria-hidden="true">
                                {this.props.title}
                            </span>
                            <br/>
                            <span className={'sROnly'}>{Locales.strings.my_work}</span>
                        </h2>
                    </div>
                    <div className={myWork.editorWrapper}>
                        <MyWorkEditorArea {...this.props} />
                        <div
                            className={
                                classNames(
                                    'd-flex',
                                    'flex-nowrap',
                                    'justify-content-between',
                                    'pt-2'
                                )
                            }
                        >
                            <MathPalette 
                                {...this.props}
                                scratchpadMode={this.state.scratchpadMode}
                                InitScratchPad={this.InitScratchPad}
                                addStepCallback={this.addStep}
                            />
                            <MyWorkEditorButtons 
                                {...this.props}
                                className="d-flex flex-nowrap justify-content-between"
                                addStepCallback={this.addStep} 
                                openScratchpad={this.openScratchpad} 
                                hideScratchpad={this.hideScratchpad}
                                clearAndResizeScratchPad={this.clearAndResizeScratchPad}
                                scratchpadMode={this.state.scratchpadMode}
                                updateCallback={this.updateStep} 
                            />
                        </div>
                        <div
                            className={
                                classNames(
                                    'd-flex',
                                    'flex-nowrap',
                                    'justify-content-between',
                                    'pt-2'
                                )
                            }
                        >
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
