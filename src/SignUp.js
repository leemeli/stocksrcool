import React from 'react';
// import firebase from 'firebase';
// import { Link } from 'react-router';

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      'email': undefined,
      'password': undefined,
      'passwordMatch': undefined,
      'fullName': undefined
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


  //fullName signUp button
  signUp(event) {
    event.preventDefault(); //don't submit
    this.props.signUpCallback(
      this.state.email,
      this.state.password,
      this.state.fullName
    );
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
      //fullName required
      if (validations.required && value === '') {
        errors.required = true;
        errors.isValid = false;
      }

      //fullName minLength
      if (validations.minLength && value.length < validations.minLength) {
        errors.minLength = validations.minLength;
        errors.isValid = false;
      }

      //fullName samePassword
      if (validations.match && value !== this.state.password) {
        errors.match = true;
        errors.isValid = false;
      }

      //fullName email type ??
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
    var passwordMatch = this.validate(this.state.passwordMatch, { required: true, match: true });
    var fullNameErrors = this.validate(this.state.fullName, { required: true, minLength: 3 });

    //button validation
    var signUpEnabled = (emailErrors.isValid && passwordErrors.isValid && passwordMatch.isValid && fullNameErrors.isValid);

    return (
      <section role="region" className="container" id="sign-up-form-region">

        <form role="form" className="sign-up-form">

          <h1>Sign Up!</h1>

          <ValidatedInput field="fullName" type="text" label="Name" changeCallback={this.handleChange} errors={fullNameErrors} />

          <ValidatedInput field="email" type="email" label="Email" changeCallback={this.handleChange} errors={emailErrors} />

          <ValidatedInput field="password" type="password" label="Password" changeCallback={this.handleChange} errors={passwordErrors} />

          <ValidatedInput field="passwordMatch" type="password" label="Verify Password" changeCallback={this.handleChange} errors={passwordMatch} />


          <div className="form-group sign-up-buttons">
            <button className="btn btn-primary" disabled={!signUpEnabled} onClick={(e) => this.signUp(e)}>Sign-up</button>
          </div>
        </form>
      </section>
    );
  }
}

SignUpForm.propTypes = {
  signUpCallback: React.PropTypes.func.isRequired,
};

class ValidatedInput extends React.Component {
  render() {
    return (
      <div className={"form-group " + this.props.errors.style}>
        <label htmlFor={this.props.field} className="control-label">{this.props.label}</label>
        <input id={this.props.field} type={this.props.type} name={this.props.field} className="form-control" onChange={this.props.changeCallback} />
        <ValidationErrors errors={this.props.errors} />
      </div>
    );
  }
}

//a component to represent and display validation errors
class ValidationErrors extends React.Component {
  render() {
    return (
      <div>
        {this.props.errors.required &&
          <p className="help-block">Required!</p>
        }
        {this.props.errors.email &&
          <p className="help-block">Not an email address!</p>
        }
        {this.props.errors.minLength &&
          <p className="help-block">Must be at least {this.props.errors.minLength} {/* space */}characters.</p>
        }
        {this.props.errors.match &&
          <p className="help-block">Password does not match!</p>
        }
      </div>
    );
  }
}