import React from 'react';
import TagsComponent from './TagsComponent.jsx';
import SectionHeader from './../PresentationalComponents/SectionHeader.jsx';
import EventListOrEventCalendar from './EventListOrEventCalendar.jsx';


const MainContentContainer = () => (
  <div>
    <TagsComponent />
    <div className="container">
      <SectionHeader />
      <EventListOrEventCalendar />
    </div>
  </div>
);

export default MainContentContainer;
