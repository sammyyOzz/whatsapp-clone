import React from 'react'
import './Login.css'
import Button from '@material-ui/core/Button'
import { auth, provider } from './firebase'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'
import Grid from '@material-ui/core/Grid'

function Login() {
    const [{}, dispatch] = useStateValue()

    const signIn = () => {
        auth
        .signInWithPopup(provider)
        .then(result => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            })
        })
        .catch(error => alert(error.message))
    }
    return (
        <div className="login">
            <Grid container>
                <Grid item xs={1} sm={2} md={3} lg={4} />
                <Grid item xs={10} sm={8} md={6} lg={4}>
                    <div className="login__container">
                        <img src="https://i.pinimg.com/originals/90/22/c3/9022c3da331305796ded3dda4c619df0.png" alt="Logo Image"/>
                        
                        <div className="login__text">
                            <h1>Sign in to Whatsapp 😁 </h1>
                        </div>

                        <Button onClick={signIn}>
                            <h4>Sign In With Google</h4>
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={1} sm={2} md={3} lg={4} />
            </Grid>
        </div>
    )
}

export default Login
