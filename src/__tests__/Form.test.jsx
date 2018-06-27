import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai, { expect, assert } from 'chai';
import sinon from 'sinon';
import { validator } from '@tacitknowledge/validator';

import 'mocha';

import { Form } from '../Form/Form';
import { addressValidationRules } from './constants';

Enzyme.configure({ adapter: new Adapter() });

validator.registerValidator('marketpattern', (value, rule) => {
    return validator.validators.pattern.call(value, rule);
});

validator.registerValidator('pattern2', (value, rule) => {
    return validator.validators.pattern.call(value, rule);
});

const FormComponent = props => {
    return (
        <Form
            validationRules={addressValidationRules}
            action="http://127.0.0.1:5000/address/save"
            method="POST"
            {...props}
        >
            <Form.Field type="select" options="mr,mrs,miss" value="mr" name="title" label="Title" placeholder="Select title" />
            <Form.Field type="text" name="firstName" label="First Name" placeholder="" value="Andrei" />
            <Form.Field type="text" name="lastName" label="Last Name" placeholder="" value="Balmus" />
            <Form.Field type="select" options="+44,+1,+373" value="+1" name="mobileCountryCode" label="Mobile" placeholder="Select code" />
            <Form.Field type="tel" name="cellPhone" label="" placeholder="" />
            <Form.Field type="text" name="line1" label="Address Line 1" placeholder="Start typing your address" />
            <Form.Field type="select" options="GB,DE" value="GB" name="countryIso" label="Country" placeholder="" />
            <Form.Field type="text" name="townCity" label="City" placeholder="" />
            <Form.Field type="text" name="postcode" label="Postcode" placeholder="Insert postcode" />

            <Form.Submit label="Submit" />
        </Form>
    )
};

describe('Form component', () => {
    let sandbox;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('should render all form fields and submit button', () => {
        const submitLabel = 'Submit Form';
        const wrapper = shallow(<FormComponent ajax />).shallow();

        const formFields = wrapper.findWhere(node => node.type() === Form.Field);

        expect(formFields).to.have.length(9);
        expect(wrapper.find('[name="title"]').shallow().find('#title > option')).to.have.length(4);
        expect(wrapper.find('[name="mobileCountryCode"]').shallow().find('#mobileCountryCode > option')).to.have.length(4);
        expect(wrapper.find('[name="countryIso"]').shallow().find('#countryIso > option')).to.have.length(2);
        expect(wrapper.find('[name="firstName"]').shallow().find('input')).to.have.length(1);
        expect(wrapper.find('[name="lastName"]').shallow().find('input')).to.have.length(1);
        expect(wrapper.find('[name="cellPhone"]').shallow().find('input')).to.have.length(1);
        expect(wrapper.find('[name="line1"]').shallow().find('input')).to.have.length(1);
        expect(wrapper.find('[name="townCity"]').shallow().find('input')).to.have.length(1);
        expect(wrapper.find('[name="postcode"]').shallow().find('input')).to.have.length(1);
        expect(wrapper.render().find('[type="submit"]')).to.have.length(1);
    });

    it('should set initial values', () => {
        const wrapper = shallow(<FormComponent />).shallow();
        const preventDefault = sinon.spy();

        expect(wrapper.find('[name="title"]').shallow().find('select').props().value).to.equal('mr');
        expect(wrapper.find('[name="firstName"]').shallow().find('input').props().value).to.equal('Andrei');
        expect(wrapper.find('[name="lastName"]').shallow().find('input').props().value).to.equal('Balmus');
    });

    it('should attach "change" validation hooks', () => {
        const wrapper = shallow(<FormComponent validateOn={['change']} />).shallow();
        const persist = sandbox.spy();
        const validateField = sandbox.spy(Form.prototype, 'validateField');

        wrapper.find('[name="lastName"]').shallow().find('input').simulate('change', {target: {value: ''}, persist});
        expect(validateField.callCount).to.equal(10);
    });

    it('should attach "click" validation hook', () => {
        const wrapper = shallow(<FormComponent validateOn={['click']} />).shallow();
        const persist = sandbox.spy();
        const validateField = sandbox.spy(Form.prototype, 'validateField');

        wrapper.find('[name="lastName"]').shallow().find('input').simulate('click', {target: {value: ''}, persist});
        expect(validateField.calledOnce).to.equal(true);
    });

    it('should attach "submit" validation hook', () => {
        const wrapper = shallow(<FormComponent validateOn={['submit']} />).shallow();
        const preventDefault = sandbox.spy();
        const persist = sandbox.spy();
        const validateForm = sandbox.spy(Form.prototype, 'validateForm');
        const validateField = sandbox.spy(Form.prototype, 'validateField');
        const formFields = wrapper.findWhere(node => node.type() === Form.Field);

        wrapper.find('form').simulate('submit', {preventDefault});
        expect(validateForm.calledOnce).to.equal(true);
        expect(validateField.callCount).to.equal(formFields.length);
    });

    it('should attach only provided validation hooks', () => {
        const wrapper = shallow(<FormComponent validateOn={['change']} />).shallow();
        const preventDefault = sandbox.spy();
        const persist = sandbox.spy();
        const validateForm = sandbox.spy(Form.prototype, 'validateForm');
        const validateField = sandbox.spy(Form.prototype, 'validateField');

        wrapper.find('form').simulate('submit', {preventDefault});

        expect(validateForm.callCount).to.equal(0);
        expect(validateField.callCount).to.equal(0);

        wrapper.find('[name="lastName"]').shallow().find('input').simulate('click', {target: {value: ''}, persist});

        expect(validateForm.callCount).to.equal(0);
        expect(validateField.callCount).to.equal(0);

        wrapper.find('[name="lastName"]').shallow().find('input').simulate('change', {target: {value: ''}, persist});

        expect(validateForm.callCount).to.equal(0);
        expect(validateField.callCount).to.equal(10);
    });

    it('should call proper handlers', () => {
        const wrapper = shallow(<FormComponent />).shallow();
        const persist = sandbox.spy();
        const handleOnClick = sandbox.spy(Form.Field.prototype, 'handleOnClick');
        const handleOnChange = sandbox.spy(Form.Field.prototype, 'handleOnChange');
        const handleOnBlur = sandbox.spy(Form.Field.prototype, 'handleOnBlur');

        wrapper.find('[name="lastName"]').shallow().find('input').simulate('click', {target: {value: 'test1'}, persist});
        wrapper.find('[name="lastName"]').shallow().find('input').simulate('change', {target: {value: 'test2'}, persist});
        wrapper.find('[name="lastName"]').shallow().find('input').simulate('blur', {target: {value: 'test3'}, persist});

        expect(handleOnClick.callCount).to.equal(1);
        expect(handleOnChange.callCount).to.equal(1);
        expect(handleOnBlur.callCount).to.equal(1);

        expect(handleOnClick.calledWith({target: {value: 'test1'}, persist}, 'lastName')).to.equal(true);
        expect(handleOnChange.calledWith({target: {value: 'test2'}, persist}, 'lastName')).to.equal(true);
        expect(handleOnBlur.calledWith({target: {value: 'test3'}, persist}, 'lastName')).to.equal(true);
    });
});
