import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createPost } from '../actions'

class PostNew extends Component {

    renderField(field) {

        const { meta: { touched, error } } = field;
        const customClass = `from-group ${touched && error ? 'has-danger' : ''}`

        return(
            <div className={customClass}>
                <label>{field.label}</label>
                <input type="text" {...field.input} className="form-control"/>
                <div className="form-control-feedback">
                    {touched ? error : ''}
                </div>                
            </div>
        );
    }

    onSubmit(values) {
        
        this.props.createPost(values, () => {
            this.props.history.push("/");
        });
    }

    render() {

        const { handleSubmit } = this.props;

        return(
            <div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <div className="card mt-5">
                        <div className="card-block">
                            <Field label="Title" name="title" component={this.renderField} />
                            <Field label="Categories" name="categories" component={this.renderField} />
                            <Field label="Post Content" name="content" component={this.renderField} />
                            <button type="submit" className="btn btn-primary mr-2">Submit</button>
                            <Link to="/" className="btn btn-danger">Cancel</Link>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {}

    if(!values.title) {
        errors.title = "Enter a title."
    }

    if(!values.categories) {
        errors.categories = "Enter some categories."
    }

    if(!values.content) {
        errors.content = "Enter some content."
    }

    //si errors se mantiene vacío -> submit form | si errors no es vacío -> valida
    return errors;
}

export default reduxForm({
    form: 'PostsNewForm',
    validate
})(
    connect(null, { createPost })(PostNew)
);