import React, {useState} from "react";
import './style.css';
import Input from "../Input";

function SignupSigninComponent(){
    const [name,setName] = useState("");

    return(
        <div className="signup-wrapper">
          <h2 className="title">
            Sign Up on 
            <span style={{color:"var(--theme)"}}>
                Financely.
            </span>
           </h2>
           <form>
            <Input 
            label={"Full Name"} 
            state={name} 
            setState={setName} 
            placeholder={"John deo"}
            />
           </form>
        </div>
    );
}

export default  SignupSigninComponent;