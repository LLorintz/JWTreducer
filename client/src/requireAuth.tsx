import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

const requireAuth = (ComposedComponent: React.ComponentType<any>) => {
  const Authenticate = (props: any) => {
    const navigate = useNavigate();

    useEffect(() => {
      if (!props.isAuthenticated) {
        navigate('/');
      }
    }, [props.isAuthenticated, navigate]);

    if (!props.isAuthenticated) {
      return null; // Vagy valami töltő animáció
    }

    return <ComposedComponent {...props} />;
  };

  const mapStateToProps = (state: any) => ({
    isAuthenticated: state.isLoggedIn,
  });

  return connect(mapStateToProps)(Authenticate);
};

export default requireAuth;
