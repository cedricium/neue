/* global chrome */

import React, { useState } from 'react';
import axios from 'axios'
import styled from 'styled-components'

const AppWrapper = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const AppContainer = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;

  @media (max-width: 720px) {
    margin: 0 1rem;
  }

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

const LicenseForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  align-items: flex-start;
`

const ErrorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: rem 0;

  background: #feb2b2;
  color: #742a2a;
`

function App() {
  const [license, setLicense] = useState('')
  const [error, setError] = useState('')

  const register = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_GUMROAD_LICENSE_VERIFICATION_URL, {
          product_permalink: process.env.REACT_APP_GUMROAD_NEUE_PRODUCT_PERMALINK,
          license_key: license
        }
      )
      const { success, uses, purchase } = data
      if (success && uses <= process.env.REACT_APP_GUMROAD_MAX_LICENSE_USES
        && !purchase.refunded && !purchase.chargebacked) {
        chrome.storage.sync.set({
          licenseKey: data.purchase.license_key
        })
      } else {
        if (uses > process.env.REACT_APP_GUMROAD_MAX_LICENSE_USES) {
          setError('License registration exceeded the max number of uses.')
        } else {
          setError('License is invalid due to being refunded or chargebacked.')
        }
      }
    } catch (error) {
      if (error.response) {
        // Gumroad-specified error
        setError(error.response.data.message)
      } else if (error.request) {
        // Unable to get response from Gumroad--probably internet-connection issue
        setError('Could not verify license key. Ensure you are connected to the internet.')
      } else {
        setError(error.message)
      }
    }
  }

  return (
    <AppWrapper>
      <AppContainer>
        <h3>neue</h3>
        <h1>License Registration</h1>

        {/* License Registration / Validation */}
        <section>
          <p>
            Thank you for trying neue! To get started, please check your receipt
            or Gumroad library and enter your license key to continue.
          </p>
          <LicenseForm onSubmit={register}>
            <label>
              License Key:
            </label>
            <input
              type="text"
              placeholder="xxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxx"
              value={license}
              onChange={e => setLicense(e.target.value)}
            />
            <input type="submit" value="Register" disabled={!license} />

            {error && (
              <ErrorWrapper>
                <p>{error}</p>
              </ErrorWrapper>
            )}
          </LicenseForm>
        </section>

        {/* License Purchase */}
        <section>
          <p>
            Don't have a license? Click the button below to buy one now:
          </p>
          <button
          // onClick={}
          >
            Purchase License
          </button>
        </section>

        {/* Help + Contact */}
        <section>
          <p>
            Already purchased your copy of neue but did not receive a license?
            Please{` `}
            <a href="" target="_blank">
              contact us
            </a>
            {` `}and we would be happy to help you out.
          </p>
        </section>
      </AppContainer>
    </AppWrapper>
  );
}

export default App;
