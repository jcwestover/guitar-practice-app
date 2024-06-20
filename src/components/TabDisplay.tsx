import React from 'react';
import styled from 'styled-components';

const TabContainer = styled.div`
  font-family: monospace;
  margin: 20px 0;
`;

interface TabDisplayProps {
  chord: string;
  tab: string;
}

const TabDisplay: React.FC<TabDisplayProps> = ({ chord, tab }) => {
  return (
    <TabContainer>
      <h3>{chord}</h3>
      <pre>{tab}</pre>
    </TabContainer>
  );
};

export default TabDisplay;
