import styled from 'styled-components'

export const AppWrapper = styled.main`
  color: #222222;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const AppContainer = styled.div`
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

export const LicenseForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  align-items: flex-start;
`

export const FormLabel = styled.label`
  margin: 0 0 1rem;
  font-weight: 600;
`

export const FormInput = styled.input`
  width: 100%;
  max-width: 300px;
  margin: 0 0 1rem;
  padding: 0.8rem;
  background: #F9F9F9;
  border: 1px solid #EEEEEE;
  border-radius: 0.4rem;
  font-size: 1.2rem;
`

export const Button = styled.button`
  border: none;
  padding: 0.8rem 1.6rem;
  border-radius: 0.4rem;
  font-size: 1.6rem;
  font-weight: 600;

  &:hover {
    cursor: pointer;
  }
`

export const FormButton = styled(Button)`
  color: #ffffff;
  background: #4299e1;

  &:disabled:hover { box-shadow: none; cursor: not-allowed; }
  &:disabled:focus,
  &:disabled:active { background: #4299e1; }

  &:hover { box-shadow: 0 0 1.6rem #bee3f8; }
  &:focus,
  &:active {
    background: #3182ce;
  }
`

export const PurchaseLink = styled(Button)`
  margin: 1rem 0 0;
  color: #222222;
  background: #efefef;
  text-decoration: none;

  &:hover { box-shadow: 0 0 1.6rem #edf2f7; }
  &:focus,
  &:active {
    background: #e5e5e5;
  }
`

export const PageSection = styled.section`
  margin: 0 0 2.4rem;
  padding: 0;
`
