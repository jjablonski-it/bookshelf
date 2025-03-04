// 🐨 make sure to add the comment and import jsx from @emotion/core
// up here so you can use the css prop
/* @jsx jsx */
import { css, jsx } from '@emotion/core'
import '@reach/dialog/styles.css'
import "bootstrap/dist/css/bootstrap-reboot.css"
import * as React from 'react'
import ReactDOM from 'react-dom'
import { Button, FormGroup, Input } from './components/lib.exercise'
import { Logo } from './components/logo'
import { Modal, ModalContents, ModalOpenButton } from './components/modal'


function LoginForm({ onSubmit, submitButton }) {
  function handleSubmit(event) {
    event.preventDefault()
    const { username, password } = event.target.elements

    onSubmit({
      username: username.value,
      password: password.value,
    })
  }

  // 🐨 this <form> could use a css prop
  // 🎨
  //    display: 'flex',
  //    flexDirection: 'column',
  //    alignItems: 'stretch',
  //    '> div': {
  //      margin: '10px auto',
  //      width: '100%',
  //      maxWidth: '300px',
  //    },
  return (
    <form onSubmit={handleSubmit} className={css`
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      '> div': {
        margin: '10px auto',
        width: '100%',
        maxWidth: '300px',
    `}>
      {/* 🐨 these div elements could be a FormGroup you create in components/lib */}
      {/* 🐨 and the inputs elements could be custom styled Input components too */}
      <FormGroup>
        <label htmlFor="username">Username</label>
        <Input id="username" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" />
      </FormGroup>
      <div>{React.cloneElement(submitButton, { type: 'submit' })}</div>
    </form>
  )
}

function App() {
  function login(formData) {
    console.log('login', formData)
  }

  function register(formData) {
    console.log('register', formData)
  }

  // 🐨 this div could use a css prop to get its children rendered nicer
  // 🎨
  //    display: 'flex',
  //    flexDirection: 'column',
  //    alignItems: 'center',
  //    justifyContent: 'center',
  //    width: '100%',
  //    height: '100vh',
  return (
    <div css={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100vh',
    }}>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      {/*
        🐨 the two buttons are too close, let's space them out
          🎨 apply this to the div right below
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gridGap: '0.75rem',
      */}
      {/* 🐨 And make sure to use the new Button component for all these buttons */}
      <div css={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gridGap: '0.75rem',
      }}>
        <Modal>
          <ModalOpenButton>
            <Button>Login</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Login form" title="Login">
            <LoginForm
              onSubmit={login}
              submitButton={<Button>Login</Button>}
            />
          </ModalContents>
        </Modal>
        <Modal>
          <ModalOpenButton>
            <Button variant="secondary">Register</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Registration form" title="Register">
            <LoginForm
              onSubmit={register}
              submitButton={<Button>Register</Button>}
            />
          </ModalContents>
        </Modal>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
