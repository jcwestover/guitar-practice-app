import React, { useState } from 'react';
import { useTimer } from 'react-timer-hook';
import styled from 'styled-components';
import TabDisplay from './TabDisplay';
import { chordTabs } from '../chordTabs';

const TimerContainer = styled.div`
  font-size: 24px;
  margin: 20px 0;
`;

const ChordStudy: React.FC = () => {
  const [selectedChords, setSelectedChords] = useState<string[]>([]);
  const [practiceTime, setPracticeTime] = useState<number>(0);
  const [showTimer, setShowTimer] = useState<boolean>(false);

  const { seconds, minutes, start, pause, resume, restart } = useTimer({
    expiryTimestamp: new Date(),
    onExpire: () => {
      const audio = new Audio('/ding.mp3');
      audio.play();
    },
  });

  const handleStartPractice = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + practiceTime * 60);
    restart(time);
    setShowTimer(true);
    start();
  };

  return (
    <div>
      <h2>Chord Study</h2>
      <div>
        <label>
          Practice Time (minutes):
          <input
            type="number"
            value={practiceTime}
            onChange={(e) => setPracticeTime(Number(e.target.value))}
          />
        </label>
        <label>
          Chords to Practice:
          <select multiple onChange={(e) => setSelectedChords(Array.from(e.target.selectedOptions, option => option.value))}>
            {Object.keys(chordTabs).map((chord) => (
              <option key={chord} value={chord}>{chord}</option>
            ))}
          </select>
        </label>
        <button onClick={handleStartPractice}>Start Practice</button>
      </div>
      {showTimer && (
        <TimerContainer>
          <div>{minutes}:{seconds}</div>
          {selectedChords.map((chord) => (
            <TabDisplay key={chord} chord={chord} tab={chordTabs[chord]} />
          ))}
        </TimerContainer>
      )}
    </div>
  );
};

export default ChordStudy;
