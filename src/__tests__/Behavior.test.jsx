import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
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

            <Form.Behavior disableIf="title" equals="mrs" >
                <Form.Field type="text" name="lastName" label="Last Name" placeholder="" value="Balmus" />
            </Form.Behavior>

            <Form.Field type="select" options="+44,+1,+373" value="+1" name="mobileCountryCode" label="Mobile" placeholder="Select code" />

            <Form.Behavior showIf="mobileCountryCode" oneOf={['+44', '+373']} >
                <Form.Field type="tel" name="cellPhone" label="" placeholder="" />
            </Form.Behavior>

            <Form.Behavior hideIf="mobileCountryCode" oneOf={['+44', '+373']} >
                <Form.Field type="text" name="line1" label="Address Line 1" placeholder="Start typing your address" />
            </Form.Behavior>

            <Form.Behavior hideIf="mobileCountryCode" equals="+44" >
                <Form.Field type="select" options="GB,DE" value="GB" name="countryIso" label="Country" placeholder="" />
            </Form.Behavior>

            <Form.Field type="text" name="townCity" label="City" placeholder="" />

            <Form.Behavior showIf="title" equals={'miss'} >
                <Form.Field type="text" name="postcode" label="Postcode" placeholder="Insert postcode" />
            </Form.Behavior>
        </Form>
    )
};

describe('Form Behavior component', () => {
    let sandbox;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('should render form fields depending on behavior', () => {
        const submitLabel = 'Submit Form';
        const wrapper = shallow(<FormComponent ajax />).shallow();

        expect(wrapper.render().find('[name="title"]')).to.have.length(1);
        expect(wrapper.render().find('[name="firstName"]')).to.have.length(1);
        expect(wrapper.render().find('[name="lastName"]')).to.have.length(1);
        expect(wrapper.render().find('[name="mobileCountryCode"]')).to.have.length(1);
        expect(wrapper.render().find('[name="line1"]')).to.have.length(1);
        expect(wrapper.render().find('[name="countryIso"]')).to.have.length(1);
        expect(wrapper.render().find('[name="cellPhone"]')).to.have.length(0);
        expect(wrapper.render().find('[name="townCity"]')).to.have.length(1);
        expect(wrapper.render().find('[name="postcode"]')).to.have.length(0);
    });

    it('should show or hide fields based on behavior', () => {
        const wrapper = shallow(<FormComponent validateOn={['change']} />).shallow();
        const persist = sandbox.spy();
        const validateField = sandbox.spy(Form.prototype, 'validateField');

        wrapper.find('[name="mobileCountryCode"]').shallow().find('select').simulate('change', {target: {value: '+44'}, persist});

        expect(wrapper.render().find('[name="title"]')).to.have.length(1);
        expect(wrapper.render().find('[name="firstName"]')).to.have.length(1);
        expect(wrapper.render().find('[name="lastName"]')).to.have.length(1);
        expect(wrapper.render().find('[name="mobileCountryCode"]')).to.have.length(1);
        expect(wrapper.render().find('[name="line1"]')).to.have.length(0);
        expect(wrapper.render().find('[name="countryIso"]')).to.have.length(0);
        expect(wrapper.render().find('[name="cellPhone"]')).to.have.length(1);
        expect(wrapper.render().find('[name="townCity"]')).to.have.length(1);
        expect(wrapper.render().find('[name="postcode"]')).to.have.length(0);

        wrapper.find('[name="title"]').shallow().find('select').simulate('change', {target: {value: 'miss'}, persist});
        expect(wrapper.render().find('[name="postcode"]')).to.have.length(1);
    });

    it('should disable field based on disabled behavior', () => {
        const wrapper = shallow(<FormComponent validateOn={['change']} />).shallow();
        const persist = sandbox.spy();
        const validateField = sandbox.spy(Form.prototype, 'validateField');

        wrapper.find('[name="title"]').shallow().find('select').simulate('change', {target: {value: 'mrs'}, persist});

        expect(wrapper.render().find('[name="lastName"]')).to.have.length(1);
        expect(wrapper.render().find('[name="lastName"]').is('[disabled]')).to.equals(true);
    });
});
