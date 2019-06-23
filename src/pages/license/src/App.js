/* global chrome */

import React, { useState } from 'react';
import axios from 'axios'

import { ReactComponent as Logo } from './assets/neue-wordmark.svg'

import {
  LogoWrapper,
  AppWrapper,
  AppContainer,
  PageSection,
  LicenseForm,
  FormLabel,
  FormInput,
  FormButton,
  PurchaseLink,
  AppHeading,
} from './styles'

function App() {
  const [license, setLicense] = useState('')
  const [loading, setLoading] = useState(false)

  const alertMessage = (type, message) => {
    switch(type) {
      case 'failure':
        alert(`Uh oh! ${message}`)
        break
      case 'success':
        alert(`Success! ${message}`)
        break
      default:
        break
    }
  }

  const register = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_GUMROAD_LICENSE_VERIFICATION_URL, {
          product_permalink: process.env.REACT_APP_GUMROAD_NEUE_PRODUCT_PERMALINK,
          license_key: license.trim()
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
          alertMessage('failure',
            'License registration exceeded the max number of uses.')
        } else {
          alertMessage('failure',
            'License is invalid due to being refunded or chargebacked.')
        }
      }
    } catch (error) {
      if (error.response) {
        // Gumroad-specified error
        alertMessage('failure',
          error.response.data.message)
      } else if (error.request) {
        // Unable to get response from Gumroad--probably internet-connection issue
        alertMessage('failure',
          'Could not verify license key. Ensure you are connected to the internet.')
      } else {
        alertMessage('failure', error.message)
      }
    }
    setLoading(false)
  }

  return (
    <AppWrapper>
      <AppContainer>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <AppHeading>License Registration</AppHeading>
        <PageSection>
          <p>
            Thank you for trying Neue! To get started, please check your receipt
            or Gumroad library and enter your license key to continue.
          </p>
          <LicenseForm onSubmit={register}>
            <FormLabel>
              License Key:
            </FormLabel>
            <FormInput
              type="text"
              placeholder="XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX"
              value={license}
              onChange={e => setLicense((e.target.value).trim())}
            />
            <FormButton
              as="input"
              type="submit"
              value={loading ? 'Registering...' : 'Register'}
              disabled={!license}
            />
          </LicenseForm>
        </PageSection>
        <PageSection>
          <p>
            Don't have a license? Click the button below to buy one now:
          </p>
          <PurchaseLink
            as="a"
            href="https://gumroad.com/products/UCxbl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Purchase License
          </PurchaseLink>
        </PageSection>
        <PageSection>
          <p>
            Already purchased your copy of Neue but did not receive a license?
            Please{` `}
            <a
              href={process.env.REACT_APP_LICENSE_SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              contact us
            </a>
            {` `}and we would be happy to help you out.
          </p>
        </PageSection>
      </AppContainer>
    </AppWrapper>
  )
}

export default App;
