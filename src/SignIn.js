import React from 'react';

export default class SignInForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      'email': undefined,
      'password': undefined
    };

    //function binding
    this.handleChange = this.handleChange.bind(this);
  }

  //update state for specific field
  handleChange(event) {
    var field = event.target.name;
    var value = event.target.value;

    var changes = {}; //object to hold changes
    changes[field] = value; //change this field
    this.setState(changes); //update state
  }

  //handle signIn button
  signIn(event) {
    event.preventDefault(); //don't submit
    this.props.signInCallback(this.state.email, this.state.password);
  }

  /**
   * A helper function to validate a value based on a hash of validations
   * second parameter has format e.g.,
   * {required: true, minLength: 5, email: true}
   * (for required field, with min length of 5, and valid email)
   */
  validate(value, validations) {
    var errors = { isValid: true, style: '' };

    if (value !== undefined) { //check validations
      //handle required
      if (validations.required && value === '') {
        errors.required = true;
        errors.isValid = false;
      }

      //handle minLength
      if (validations.minLength && value.length < validations.minLength) {
        errors.minLength = validations.minLength;
        errors.isValid = false;
      }

      //handle email type ??
      if (validations.email) {
        //pattern comparison from w3c
        //https://www.w3.org/TR/html-markup/input.email.html#input.email.attrs.value.single
        var valid = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)
        if (!valid) {
          errors.email = true;
          errors.isValid = false;
        }
      }
    }

    //display details
    if (!errors.isValid) { //if found errors
      errors.style = 'has-error';
    }
    else if (value !== undefined) { //valid and has input
      //errors.style = 'has-success' //show success coloring
    }
    else { //valid and no input
      errors.isValid = false; //make false anyway
    }
    return errors; //return data object
  }

  render() {
    //field validation
    var emailErrors = this.validate(this.state.email, { required: true, email: true });
    var passwordErrors = this.validate(this.state.password, { required: true, minLength: 6 });

    //button validation
    var signInEnabled = (emailErrors.isValid && passwordErrors.isValid);

    return (
      <section className="container" id="sign-in-form-section" role="region">
        <form role="form" className="sign-in-form">
          <div id="col3" className="form-group sign-up-buttons">
            <button className="btn btn-primary" disabled={!signInEnabled} onClick={(e) => this.signIn(e)}>Login</button>
          </div>
          <div id="col2">
            <ValidatedInput field="password" type="password" label="Password"  tabIndex={2} changeCallback={this.handleChange} errors={passwordErrors} />
          </div>
          <div id="col1">
            <ValidatedInput field="email" type="email" label="Email"  tabIndex={1} changeCallback={this.handleChange} errors={emailErrors} />
          </div>
        </form>
      </section>
    );
  }
}

SignInForm.propTypes = {
  signInCallback: React.PropTypes.func.isRequired
};

class ValidatedInput extends React.Component {
  render() {
    return (
      <div className={"form-group " + this.props.errors.style}>
        <label htmlFor={this.props.field} className="control-label">{this.props.label}</label>
        <input id={this.props.field} type={this.props.type} tabIndex={this.props.tabIndex} name={this.props.field} className="form-control" onChange={this.props.changeCallback} />
      </div>
    );
  }
}