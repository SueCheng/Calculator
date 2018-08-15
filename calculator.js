import React, { Component } from "react";
import ReactDOM from "react-dom";
import styles from "./styles.css";
import _ from "lodash";

var MAXIMUM_CALCULATE_CAPABILITY = 30;

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maximum: false,
      formula: [],
      result: 0,
      lastOperator: null
    };
  }
  onAC() {
    this.setState({
      formula: [],
      result: 0,
      lastOperator: null
    });
  }
  onEval() {
    let calculatorResult = eval(_.join(this.state.formula, ""));
    this.setState({
      result: calculatorResult,
      lastOperator: null
    });
  }
  onOperator(operator) {
    console.log(`you input ${operator} `);
    if (_.join(this.state.formula, "").length > MAXIMUM_CALCULATE_CAPABILITY) {
      this.setState({
        result: "you are excessing the maximum calculation capability"
      });
      return;
    }
    switch (this.state.lastOperator) {
      case null:
        if (operator === "/" || operator === "*")
          this.setState({
            result: "can't start with / or *"
          });
        else
          this.setState({
            formula: [operator],
            lastOperator: "number",
            result: 0
          });
        break;
      case "number":
        this.setState({
          formula: [...this.state.formula, operator],
          lastOperator: "operator"
        });
        break;
      case "decimal":
        var reg = /^(\d)+(.)*(\d)*$/;
        if (reg.test(this.state.formula[this.state.formula.length - 1]))
          this.setState({
            formula: [...this.state.formula, operator],
            lastOperator: "operator"
          });
        else
          this.setState({
            formula: [],
            result: "operator and decimal can't pile together",
            lastOperator: null
          });
        break;
      case "operator":
        this.setState({
          formula: [
            ...this.state.formula.slice(0, this.state.formula.length - 1),
            operator
          ]
        });
        break;
    }
  }
  concatNumber(number, decimal) {
    let output;
    if (decimal)
      output = this.state.formula[this.state.formula.length - 1] + "." + number;
    else output = this.state.formula[this.state.formula.length - 1] + number;
    console.log(`concatNumber ${number} ${output}`);
    return output;
  }
  onNumber(number) {
    console.log(`you input ${number} `);
    if (_.join(this.state.formula, "").length > MAXIMUM_CALCULATE_CAPABILITY) {
      this.setState({
        result: "you are excessing the maximum calculation capability"
      });
      return;
    }
    switch (this.state.lastOperator) {
      case null:
        this.setState({
          formula: [number],
          lastOperator: "number",
          result: 0
        });
        break;
      case "number":
        this.setState({
          formula: [
            ...this.state.formula.slice(0, this.state.formula.length - 1),
            this.concatNumber(number, false)
          ]
        });
        break;
      case "operator":
        this.setState({
          formula: [...this.state.formula, number],
          lastOperator: "number"
        });
        break;
      case "decimal":
        var reg = /^(\d)+(.)*(\d)*$/;
        if (reg.test(this.state.formula[this.state.formula.length - 1]))
          //Number
          this.setState({
            formula: [
              ...this.state.formula.slice(0, this.state.formula.length - 1),
              this.state.formula[this.state.formula.length - 1].includes(".")
                ? this.concatNumber(number)
                : this.concatNumber(number, true)
            ],
            lastOperator: "number"
          });
        else
          this.setState({
            formula: [...this.state.formula, "0." + number],
            lastOperator: "number"
          });
        break;
    }
  }
  onDecimal() {
    console.log(`you input decimal `);
    if (_.join(this.state.formula, "") > MAXIMUM_CALCULATE_CAPABILITY) {
      this.setState({
        result: "you are excessing the maximum calculation capability"
      });
      return;
    }
    switch (this.state.lastOperator) {
      case null:
        this.setState({
          formula: ["0"],
          lastOperator: "decimal",
          result: 0
        });
        break;
      case "number":
      case "operator":
        this.setState({
          lastOperator: "decimal"
        });
        break;
    }
  }
  controlSize() {
    this.setState({ maximum: !this.state.maximum });
  }
  render() {
    return (
      <div className={this.state.maximum ? styles.maximum : styles.normal}>
        <div className={styles.header}>
          Sue's Calculator
          <div className={styles.rightCorner}>
            <i
              className={
                this.state.maximum
                  ? "fa fa-window-minimize"
                  : "fa fa-window-maximize"
              }
              onClick={this.controlSize.bind(this)}
            />
          </div>
        </div>
        <div className={styles.calculator}>
          <p className={styles.rightAlign}>
            {this.state.formula.length > 0 ? _.join(this.state.formula, "") : 0}
          </p>
          <p className={styles.rightAlign}>{this.state.result}</p>
          <div className={styles.row}>
            <button
              onClick={this.onAC.bind(this)}
              className={[styles.halfCol, styles.singleHeight].join(" ")}
            >
              AC
            </button>
            <button
              onClick={() => this.onOperator("/")}
              className={[styles.quarterCol, styles.singleHeight].join(" ")}
            >
              /
            </button>
            <button
              onClick={() => this.onOperator("*")}
              className={[styles.quarterCol, styles.singleHeight].join(" ")}
            >
              *
            </button>
          </div>
          <div className={styles.row}>
            <button
              onClick={() => this.onNumber("7")}
              className={[styles.quarterCol, styles.singleHeight].join(" ")}
            >
              7
            </button>
            <button
              onClick={() => this.onNumber("8")}
              className={[styles.quarterCol, styles.singleHeight].join(" ")}
            >
              8
            </button>
            <button
              onClick={() => this.onNumber("9")}
              className={[styles.quarterCol, styles.singleHeight].join(" ")}
            >
              9
            </button>
            <button
              onClick={() => this.onOperator("-")}
              className={[styles.quarterCol, styles.singleHeight].join(" ")}
            >
              -
            </button>
          </div>
          <div className={styles.row}>
            <button
              onClick={() => this.onNumber("4")}
              className={[styles.quarterCol, styles.singleHeight].join(" ")}
            >
              4
            </button>
            <button
              onClick={() => this.onNumber("5")}
              className={[styles.quarterCol, styles.singleHeight].join(" ")}
            >
              5
            </button>
            <button
              onClick={() => this.onNumber("6")}
              className={[styles.quarterCol, styles.singleHeight].join(" ")}
            >
              6
            </button>
            <button
              onClick={() => this.onOperator("+")}
              className={[styles.quarterCol, styles.singleHeight].join(" ")}
            >
              +
            </button>
          </div>
          <div className={styles.row}>
            <div
              className={[styles.threeQuarterCol, styles.inlineBlock].join(" ")}
            >
              <div className={styles.row}>
                <button
                  onClick={() => this.onNumber("1")}
                  className={[styles.thirdCol, styles.singleHeight].join(" ")}
                >
                  1
                </button>
                <button
                  onClick={() => this.onNumber("2")}
                  className={[styles.thirdCol, styles.singleHeight].join(" ")}
                >
                  2
                </button>
                <button
                  onClick={() => this.onNumber("3")}
                  className={[styles.thirdCol, styles.singleHeight].join(" ")}
                >
                  3
                </button>
              </div>
              <div className={styles.row}>
                <button
                  onClick={() => this.onNumber("0")}
                  className={[styles.twoThirdCol, styles.singleHeight].join(
                    " "
                  )}
                >
                  0
                </button>
                <button
                  onClick={this.onDecimal.bind(this)}
                  className={[styles.thirdCol, styles.singleHeight].join(" ")}
                >
                  .
                </button>
              </div>
            </div>
            <button
              onClick={this.onEval.bind(this)}
              className={[
                styles.quarterCol,
                styles.inlineBlock,
                styles.topAlign,
                styles.doubleHeight
              ].join(" ")}
            >
              =
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.querySelector("#root"));
