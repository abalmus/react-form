

# React Form
The powerful form which includes validation and behaviours.

## **Description**

**React Form** - React component which allows you to create different types of Forms. The component includes smart validation engine, behaviors and form grouping.

## Installation
```javascript
// NPM
npm install @tacitknowledge/react-form

// YARN
yarn add @tacitknowledge/react-form
```
## Form
**Form** - wrapper component that handles the submission and validation of forms.

```javascript
<Form
    validationRules={...}
    validateOn={['change']}
    submitHandler={(formData) => //...fetch request to save formData}
>
    <Form.Field
       type="password"
       name="password"
       placeholder="Insert Password"
       label="Password"
    />
</Form>
```

### Form props
| prop | description |
|--|--|
| **submitHandler** | form submit handler |
| **submitSuccess** | form submit success handler |
| **submitError** | form submit error handler |
| **validationRules** | validation constrains to be attached to validation engine |
| **validateOn** | array of available validation hooks ['submit', 'blur', 'change'] |

## Form Field
**Field** - wrapper component that handles the standard form element state and behaviours.
```javascript
<Form>
    <Form.Field
       type="password"
       name="password"
       placeholder="Insert Password"
       label="Password"
    />
</Form>
```
### Field props
| prop | description |
|--|--|
| **type** | [string] - Determine [type](https://www.w3schools.com/tags/att_input_type.asp) of input |
| **name** | [string] - Unique filed name |
| **placeholder** | [string] - Field placeholder |
| **value** | [string] - Predefined value |
| **label** | [string] - Field label |

#### Simple Login Form
```javascript
import  { Form }  from  '@tacitknowledge/react-form';

const LoginForm = props => {
  return (
    <Form
      submitHandler={props.handleSubmit}
      validateOn={["submit", "blur", "change"]}
      validationRules={props.constrains}
    >
      <Form.Field
        type="email"
        name="email"
        placeholder="Insert Email"
        label="Email"
      />

      <Form.Field
        type="password"
        name="password"
        placeholder="Insert Password"
        label="Password"
      />

      <Form.Submit label="Login" />
    </Form>
  );
};
```
[![Edit React Form - Login](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/3qkjnm78mq)



## Behaviors
**Behavior** - sub component provides flexible way of adding some form behaviors. Built in behaviors (**hideIf**, **showIf**, **disableIf**, *...more to be delivered*)

```javascript
    <Form.Behavior
        showIf="[form field name]"
        equals="[to value]">
        //
    </Form.Behavior>

    <Form.Behavior
        showIf="[form field name]"
        oneOf={['array', 'of', 'values']}>
        ...
    </Form.Behavior>
```

### Behavior props
| prop | description |
|--|--|
| **hideIf** | hide the elements inside Behavior section |
| **showIf** | show the elements inside Behavior section |
| **disableIf** | disable the elements inside Behavior section |
| **equals** | value to be compared with form field provided in behaviour type prop |
| **oneOf** | array of values to be compared with form field provided in behaviour type prop |
| **contains** | checks if form field value contains substring |

#### Example
```javascript
import  { Form }  from  '@tacitknowledge/react-form';

const LoginForm = props => {
  return (
    <Form
      submitHandler={props.handleSubmit}
      validateOn={["submit", "blur", "change"]}
      validationRules={props.constrains}
    >
      <p>Insert 'test@test'</p>
      <Form.Field
        type="email"
        name="email"
        placeholder="Insert Email"
        label="Email"
      />

      <Form.Behavior showIf="email" equals="test@test">
        <Form.Field
          type="password"
          name="password"
          placeholder="Insert Password"
          label="Password"
        />
      </Form.Behavior>

      <Form.Submit label="Login" />
    </Form>
  );
};
```

[![Edit Form Behavior - Login](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/jv614v7313)