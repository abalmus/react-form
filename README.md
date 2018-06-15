# react-form
Reusable React component, which includes fast and modern Validation Processor and a set of form fields.

## Installation

```javascript
// NPM
npm install @tacitknowledge/react-form

// YARN
yarn add @tacitknowledge/react-form
```

# Usage

### Working with Form component

```javascript
import { Form } from '@tacitknowledge/react-form';

const constrains = {
    rules: {
        firstName: {
            minlength: 10
        }
    },
    messages: {
        firstName: {
            minlength: 'First name needs to be not less than 10 characters'
        }
    }
};

<Form
    action="/api/to/save"
    ajax
    method="POST"
    validateOn={['submit', 'blur']}
    validationRules={constrains}
    submitLabel="Submit"
>
    <Form.Field
        type="text"
        name="firstName"
        label="First Name"
        placeholder=""
        value="Andrei"
    />
</Form>;
```
