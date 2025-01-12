import React, { createContext, useEffect } from 'react';
import { logEvent, logPageView } from './tracking';
import _ from 'lodash';
import { useLocation } from 'react-router-dom';

const TrackingContext = createContext();

const TrackingProvider = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    logPageView(location.pathname + location.search);
  }, [location]);

  useEffect(() => {

    const handleClick = _.debounce((event) => {
      if (event.target.tagName === 'BUTTON') {
        logEvent('button_click', {
          id: event.target.id,
          text: event.target.innerText
        });
      }
    }, 200);

    const handleSubmit = (event) => {
      if (event.target.tagName === 'FORM') {
        logEvent('form_submit', {
          id: event.target.id,
          action: event.target.action
        });
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('submit', handleSubmit);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('submit', handleSubmit);
    };
  }, []);

  return (
    <TrackingContext.Provider value={{ logEvent, logPageView }}>
      {children}
    </TrackingContext.Provider>
  );
};

export default TrackingProvider;