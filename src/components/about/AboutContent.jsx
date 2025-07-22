import React from 'react';
import WhoWeAre from './WhoWeAre';
import OurMission from './OurMission';
import JoinUs from './JoinUs';
import WhatWeDo from './WhatWeDo';
import WhatMatters from './WhatMatters';
import OurCoreValues from './OurCoreValues';
import OurTeam from './OurTeam';


function AboutContent({ activePage }) {
  const renderContent = () => {
    switch (activePage) {
      case 'who-we-are':
        return <WhoWeAre />;
      case 'mission':
        return <OurMission />;
      case 'what-we-do':
        return <WhatWeDo />;
      case 'why-it-matters':
        return <WhatMatters />;
      case 'values':
        return <OurCoreValues />;
      case 'team':
        return <OurTeam />;
      case 'join-us':
        return <JoinUs />;
      default:
        return <WhoWeAre />;
    }
  };

  return (
    <div className="about-content-container">
      {renderContent()}
    </div>
  );
}

export default AboutContent;
