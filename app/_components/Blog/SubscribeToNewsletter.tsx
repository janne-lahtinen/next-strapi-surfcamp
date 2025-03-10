'use client';

import { useState, FormEvent } from "react";
import axios from "axios";
import React from 'react';

const SubscribeToNewsletter = () => {
  const [email, setEmail] = useState('');
  const [hasSignedUp, setHasSignedUp] = useState(false);
  const [showError, setShowError] = useState(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (email.length) {
        // Sent email to strapi
        await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/newsletter-signups`, {
          data: {
            email,
          }
        });
      }
      setHasSignedUp(true);
    } catch (error) {
      // Give feedback to the user
      console.log(error);
      setShowError(true);
    }
  }

  return (
    <section className="newsletter">
      {showError ? (
        <h4 className="newsletter__thanks">
          Could not sign up for the newsletter
        </h4>
      ) : hasSignedUp ? (
        <h4 className="newsletter__thanks">
          Thank you for signing up for our newsletter
        </h4>
      ) : (
        <>
          <div className="newsletter__info">
            <h4>subscribe to our newsletter</h4>
            <p className="copy">Unlock Exclusive Insights and Stay In the Know – Subscribe to Our Newsletter Today to always stay in touch</p>
          </div>
          <form action="" className="newsletter__form" onSubmit={onSubmit}>
            <input
              type="text"
              className="newsletter__email input"
              placeholder="Enter your email address"
              value={email}
              onChange={onChange}
            />
            <button
              type="submit"
              className="newsletter__subscribe btn btn--medium btn--turquoise"
            >
              SUBSCRIBE
            </button>
          </form>
        </>
      )
      }
    </section>
  )
}

export default SubscribeToNewsletter;
