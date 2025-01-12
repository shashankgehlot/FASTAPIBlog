import { decodeToken } from '../Utility/appUtility';

const sendEvent = async (eventType, eventDetails) => {
  console.log('Sending event:', eventType, eventDetails);
  let user = decodeToken();
  if (user == null){
    user = {
      user_id:'Anonymous User'
    }
  }
  // Implement your event tracking logic here
    try {
      await fetch('/api/track/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventType, eventDetails, timestamp: new Date().toISOString(),user_id: user.user_id}),
      });
    } catch (error) {
      console.error('Error sending event:', error);
    }
  };
  
  export const logEvent = (eventType, eventDetails) => {
    console.log('Tracking event:', eventType, eventDetails); // Optional: log the event for debugging
    sendEvent(eventType, eventDetails);
  };
  
  export const logPageView = (path) => {
    console.log('Tracking page view:', path); // Optional: log the path for debugging
    sendEvent('page_view', { path });
  };