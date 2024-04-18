import React from 'react';

const 
Form = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
}



function Form() {
    return(
        <>
        <h1>Login</h1>
    <form action="authlogin/login" method="post">
    <label for="">email</label>
    <input type="text" name="nm_email" id="email"/><br/>
    <br/>
    <label for="">SENHA</label>
    <input type="password" name="cd_senha" id="password"/> 

    <button type="submit" >ENVIAR</button>
    </form> 
    </>  
    );
}
export default Form