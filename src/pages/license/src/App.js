import React, { useState } from 'react';
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

function App() {
  const [license, setLicense] = useState('')

  const register = async (e) => {
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
          <LicenseForm>
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
