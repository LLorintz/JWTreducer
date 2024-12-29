import { NavLink } from "react-router-dom"
import { connect, ConnectedProps } from "react-redux";

type RootState = {
  isLoggedIn: boolean;
};

const mapStateToProps = (state: RootState) => ({
  isLoggedIn: state.isLoggedIn,
});

// A connect által generált propok típusa
type PropsFromRedux = ConnectedProps<typeof connector>;

const Menu = (props: PropsFromRedux) => {
  return (
    <div>
      {props.isLoggedIn ? null : <div><NavLink to="/">Login</NavLink></div>}
      {props.isLoggedIn ? (
        <>
          <div><NavLink to="/accounts">Accounts</NavLink></div>
          <div><NavLink to="/profile">Profile</NavLink></div>
        </>
      ) : null}
    </div>
  );
};

const connector = connect(mapStateToProps);
export default connector(Menu);
