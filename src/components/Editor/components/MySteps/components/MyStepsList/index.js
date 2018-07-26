import React, {Component} from "react";
import Step from "./components/Step";
import classNames from "classnames";
import myStepsList from './styles.css';
import mySteps from '../../../../styles.css';
import MyWork from '../../../../components/MyWork';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';

export default class MyStepsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            steps: props.steps
        };
    }

    render() {
        var counter = 1;
        let steps = this.state.steps.map( (step, i) => {
            var showTrash = false;
            var showEdit = false;
            if (i > 0) {
                showEdit = true;
            }

            if (i == this.state.steps.length - 1 && this.state.steps.length > 1) {
                showTrash = true;
            }
          
            return <Step
                    key={i}
                    exposedKey={i}
                    stepNumber={step.annotation==="(cleanup)" ? counter : counter++}
                    math={step.equation}
                    annotation={step.annotation}
                    showEdit={showEdit}
                    showTrash={showTrash}
                    deleteStepCallback={this.props.deleteStepCallback}
                    editStepCallback={this.props.editStepCallback}/>  
            }
        );

        steps.splice(this.props.editorPosition + 1, 0, 
            <MyWork
                key={"editor"}
                allowedPalettes={this.props.allowedPalettes}
                activateMathField={this.props.activateMathField}
                theActiveMathField={this.props.theActiveMathField}
                textAreaChanged={this.props.textAreaChanged}
                textAreaValue={this.props.textAreaValue}
                addStepCallback={this.props.addStepCallback}
                undoLastActionCallback={this.props.undoLastActionCallback}
                lastMathEquation={this.props.lastMathEquation} 
                deleteStepsCallback={this.props.deleteStepsCallback}
                cancelEditCallback={this.props.cancelEditCallback}
                editing={this.props.editing}
                history={this.props.history}/>
        )

        return (
            <div id="HistoryWrapper" className={mySteps.historyWrapper}>
                <div className={bootstrap.row} data-step="4"
                     data-intro="Review your work. The trash icon also allows you to delete and rework a prior step.">
                    <div className={bootstrap['col-lg-12']}>
                        <div
                            id="MathHistory"
                            className={
                                classNames(
                                    bootstrap['container-fluid'],
                                    myStepsList.list
                                )
                            }
                            role="heading"
                            aria-level="2"
                        >
                            {steps}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
