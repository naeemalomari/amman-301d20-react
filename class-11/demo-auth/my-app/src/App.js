import React from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import User from './User';
import { withAuth0 } from '@auth0/auth0-react';


class App extends React.Component {
  render() {
    return (
      <>
        <h2>Auth Demo</h2>
        <LoginButton />
        <LogoutButton />
        <User />

      </>
    )
  }
}

export default App;



// import React from 'react';
// import LoginButton from './LoginButton';
// import LogoutButton from './LogoutButton';
// import User from './User';
// import { withAuth0 } from '@auth0/auth0-react';


// class App extends React.Component {
//   render() {
//     return (
//       <>
//         <h2>Auth Demo</h2>
//         <LoginButton />
//         <LogoutButton />
//         <>
//           {
//             this.props.auth0.isAuthenticated &&
//             <User />
//           }
//         </>

//       </>
//     )
//   }
// }

// export default withAuth0(App);