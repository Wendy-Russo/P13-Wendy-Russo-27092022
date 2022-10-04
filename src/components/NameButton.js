import { useSelector } from "react-redux";
import UserService from "../services/user.service";
import { useState, useEffect} from "react"

function NameButton(){

  const { isLoggedIn } = useSelector((state) => state.auth);
  const [firstName, setFirstName] = useState("");
  const [content, setContent] = useState("");


  useEffect(() => {

    if(isLoggedIn){
      UserService.getUserProfile().then(
        (response) => {
          setContent(response.data);
          setFirstName(response.data.body.firstName);
        },
        (error) => {
          const _content =
            (error.response && error.response.data && error.response.data.message)
            ||
            error.message 
            ||
            error.toString();
  
          setContent(_content);
        }
      );
    }
    
  });

  return(

    <>
      {isLoggedIn ? (
        <a className="main-nav-item me-3" href="./user">
          <i className="fa fa-user-circle me-1" />
          {firstName}
        </a>) :
        (<a className="main-nav-item" href="./login">
          <i className="fa fa-user-circle me-1" />
          Sign In
        </a>)
      }  
    </>
  )
  

  
}

export default NameButton
