'use client';

import { ReactElement, useState } from "react";
import TextInput from "../TextInput";
import axios from "axios";
import { allDataFilledIn } from "@/utils/validation.utils";
import { type BlocksContent } from '@strapi/blocks-react-renderer';
import BlocksRendererClient from "../BlocksRendererClient";
import { generateSignupPayload } from "@/utils/strapi.utils";

interface infoData {
  headline: string;
  infoText: BlocksContent;
  buttonLabel?: string;
  pricing?: {
    singlePrice: number;
    sharedPrice: number;
  };
  eventId?: string | null;
}

interface formDataState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const SignupForm = ({
  infoText,
  headline,
  buttonLabel,
  pricing,
  eventId = null
}: infoData) => {
  const [formData, setFormData] = useState<formDataState>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = generateSignupPayload(formData, eventId);

    if (allDataFilledIn(formData)) {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/participants`, payload);
        setShowConfirmation(true);
      } catch (error: any) {
        setErrorMessage(error.response?.data?.error?.message || 'Something went wrong...');
      }
    } else {
      setErrorMessage('Please fill out all fields.');
    }
  }

  return (
    <section className="signup-form">
      <div className="signup-form__info">
        <h3 className="signup-form__headline">{headline || 'This will show when nothing is being passed in'}</h3>
        <BlocksRendererClient content={infoText} />
      </div>
      {showConfirmation ? (<div className="signup-form__form">
        <h4>Thank you for signing up. We will get in touch soon!</h4>
      </div>) : (
        <form className="signup-form__form" onSubmit={onSubmit}>
          <div className="signup-form__name-container">
            <TextInput
              inputName="firstName"
              label="First name"
              value={formData.firstName}
              onChange={onChange}
            />
            <TextInput
              inputName="lastName"
              label="Last name"
              value={formData.lastName}
              onChange={onChange}
            />
          </div>
          <TextInput
            inputName="email"
            label="Your email address"
            value={formData.email}
            onChange={onChange}
          />
          <TextInput
            inputName="phone"
            label="Your phone number"
            value={formData.phone}
            onChange={onChange}
          />
          {errorMessage && (
            <p className="copy signup-form__error">{errorMessage}</p>
          )}
          <button className="btn btn--medium btn--turquoise" type="submit">
            {buttonLabel || 'Stay in touch!'}
          </button>
          {pricing && (
            <div className="signup-form__pricing">
              <h3>Pricing</h3>
              <p className="copy">
                Single room: <span className="bold">{pricing.singlePrice}€ per person</span>
              </p>
              <p className="copy">
                Shared room: <span className="bold">{pricing.sharedPrice}€ per person</span>
              </p>
            </div>
          )}
        </form>
      )}
    </section>
  )
}

export default SignupForm;