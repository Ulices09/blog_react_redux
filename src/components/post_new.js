import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

class PostNew extends Component {

    renderField(field) {
        return(
            <div className="form-group has-danger">
                <label>{field.label}</label>
                <input type="text" {...field.input} className="form-control"/>
                <div className="text-help">
                    {field.meta.touched ? field.meta.error : ''}
                </div>                
            </div>
        );
    }

    onSubmit(values) {
        console.log(values);
    }

    render() {

        const { handleSubmit } = this.props;

        return(
            <div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field label="Title" name="title" component={this.renderField} />
                    <Field label="Categories" name="categories" component={this.renderField} />
                    <Field label="Post Content" name="content" component={this.renderField} />
                    <button type="submit" className="btn btn-primary">Submit</button>
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
})(PostNew);