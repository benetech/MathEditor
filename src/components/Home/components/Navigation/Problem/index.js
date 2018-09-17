import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import Button from '../../.././../Button';
import classNames from "classnames";
import { EDIT_PROBLEM, CONFIRMATION, ADD_PROBLEMS } from '../../../../ModalContainer';
import problem from './styles.css';
import buttons from '../../../../../components/Button/styles.css';
import Locales from '../../../../../strings';
import axios from 'axios';
import FontAwesome from "react-fontawesome";
import showImage from '../../../../../scripts/showImage.js';
import parseMathLive from '../../../../../scripts/parseMathLive.js';
import { SERVER_URL } from '../../../../../config';

const mathLive = DEBUG_MODE ? require('../../../../../../mathlive/src/mathlive.js')
: require('../../../../../lib/mathlivedist/mathlive.js');
const problemTextDisplayLength = 40;
const problemMathDisplayLength = 30;
const OPEN_TEXT_TAG = "\\text{";

export default class Problem extends Component {
    constructor(props) {
        super(props);

        this.createNewSolution = this.createNewSolution.bind(this);
        this.onTrashClick = this.onTrashClick.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onImgClick = this.onImgClick.bind(this);
    }

    buildAnnotation() {
        var text = parseMathLive(this.props.problem.title);
        if ((text.match(/\\text{/g) || []).length > 1) {
            if (text.includes("\\frac")) {
                text = this.buildComplexProblemText();
            } else if (text.length > problemMathDisplayLength) {
                text = text.slice(0, problemMathDisplayLength) + "...";
            }
            return "$$" + OPEN_TEXT_TAG + (this.props.number + 1) + ". }" + text + "}$$";
        } else {
            return (this.props.number + 1) + ". " + this.props.problem.title;
        }
    }


    buildProblemText() {
        var text = this.props.problem.text;
        if (text.includes("\\frac")) {
            text = this.buildComplexProblemText();
        } else if (text.length > problemTextDisplayLength) {
            text = text.slice(0, problemTextDisplayLength) + "...";
        }
        return "$$" + text + "$$";
    }

    buildProblemImage() {
        return <img className={problem.image} src={this.props.problem.scratchpad}/>
    }

    buildComplexProblemText() {
        var text = this.props.problem.text;
        var equationParts = text.split("{");
        var result = "";
        equationParts.forEach(function(part, i) {
            if (part.length > problemMathDisplayLength) {
                result += "{" + part.slice(0, problemMathDisplayLength) + "...}";
            } else {
                if (i != 0) {
                    result += "{";
                }
                result +=  part;
            }
        });
        return result;
    }

    componentDidMount() {
        mathLive.renderMathInDocument();
    }

    onTrashClick(e) {
        this.props.activateModals([CONFIRMATION], this.props.number);
        e.stopPropagation();
    }

    onEditClick(e) {
        this.props.activateModals([EDIT_PROBLEM], this.props.number);
        e.stopPropagation();
    }

    onImgClick(e) {
        showImage(this.props.problem.scratchpad);
        e.stopPropagation();
    }

    createNewSolution(history) {
        var solution = {
            problem: {
                problemSetRevisionShareCode: this.props.problem.problemSetRevisionShareCode,
                text: this.props.problem.text,
                title: this.props.problem.title
            },
            steps: [
                {
                    stepValue: this.props.problem.text,
                    explanation: this.props.problem.title
                }
            ]
        }
        axios.post(`${SERVER_URL}/solution/`, solution)
            .then(response => {
                history.push('/problem/edit/' + response.data.editCode);
            })
    }

    render() {
        var annotation;
        var equation;
        var image;
        if (this.props.example) {
            annotation = Locales.strings.getting_started_title;
            equation = Locales.strings.getting_started_equation;
        } else if (this.props.addNew) {
            annotation = Locales.strings.add_problem_title;
        } else {
            annotation = this.buildAnnotation();
            equation = this.buildProblemText();
            image = this.buildProblemImage();
        }
    
        var wrappedAnnotation = annotation !== undefined && (annotation.match(/\\text{/g) || []).length > 1 ? 
            <span className={problem.problemAnnotationScaled}>{annotation}</span> :
            <span className={problem.problemAnnotation}>{annotation}</span>
            
        var imgButton = (this.props.problem && this.props.problem.scratchpad) ? 
        <FontAwesome
            className={
                classNames(
                    problem.imgIcon,
                    'fa-2x'
                )
            }
            onClick={this.onImgClick}
            name='image'
        />
        : null;

        var plusButton = this.props.addNew ?
        <FontAwesome
            className={
                classNames(
                    problem.plusIcon,
                    'fa-2x'
                )
            }
            name='plus-circle'
        />
        : null;

        var editButton = this.props.showRemove ?
        <FontAwesome
            className={
                classNames(
                    problem.editIcon,
                    'fa-2x'
                )
            }
            onClick={this.onEditClick}
            name='edit'
        />
        : null;

        var removeButton = this.props.showRemove ?
        <FontAwesome
            className={
                classNames(
                    problem.trashIcon,
                    'fa-2x'
                )
            }
            onClick={this.onTrashClick}
            name='trash'
        />
        : null;

        const NavItem = withRouter(({ history }) => (
            <div
                className={
                    classNames(
                        'col-md-4',
                        'text-center',
                        problem.problem
                    )
                }
            >
                <span
                    className={
                        classNames(
                            'btn',
                            buttons.default,
                            buttons.huge,
                            problem.navSpan
                        )
                    }
                    onClick={() => this.props.addNew ? this.props.activateModals([ADD_PROBLEMS]) : this.createNewSolution(history)}
                >
                <div className={problem.middle}>
                    <Button
                        className={
                            classNames(
                                problem.navItemButton,
                                problem.colorInherit
                            )
                        }
                        content={wrappedAnnotation}
                    />
                    {imgButton}
                    {removeButton}
                    {plusButton}
                    {editButton}
                    {equation}
                    {image}
                </div>
                </span>
            </div>
        ))
        return <NavItem />
    }
}
