import React, { useState } from 'react';
import { useTimer } from 'react-timer-hook';
import styled from 'styled-components';
import TabDisplay from './TabDisplay';
import { chordTabs } from '../chordTabs';

const TimerContainer = styled.div`
  font-size: 24px;
  margin: 20px 0;
`;

const MinuteChanges: React.FC = () => {
  const [chord1, setChord1] = useState<string>('');
  const [chord2, setChord2] = useState<string>('');
  const [showTimer, setShowTimer] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(5);

  const { seconds, minutes, start, pause, resume, restart } = useTimer({
    expiryTimestamp: new Date(),
    onExpire: () => {
      const audio = new Audio('/ding.mp3');
      audio.play();
    },
  });

  const handleStartChanges = () => {
    let countdownTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(countdownTimer);
          const time = new Date();
          time.setSeconds(time.getSeconds() + 60);
          restart(time);
          setShowTimer(true);
          start();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div>
      <h2>One Minute Changes</h2>
      <div>
        <label>
          Chord 1:
          <select onChange={(e) => setChord1(e.target.value)}>
            {Object.keys(chordTabs).map((chord) => (
              <option key={chord} value={chord}>
                {chord}
              </option>
            ))}
          </select>
        </label>
        <label>
          Chord 2:
          <select onChange={(e) => setChord2(e.target.value)}>
            {Object.keys(chordTabs).map((chord) => (
              <option key={chord} value={chord}>
                {chord}
              </option>
            ))}
          </select>
        </label>
        <button onClick={handleStartChanges}>Start Changes</button>
      </div>
      {countdown > 0 && <div>Get Ready: {countdown}</div>}
      <TimerContainer>
        <div>{showTimer ? `${minutes}:${seconds}` : null}</div>
        <div>
          {chord1 && <TabDisplay chord={chord1} tab={chordTabs[chord1]} />}
          {chord2 && <TabDisplay chord={chord2} tab={chordTabs[chord2]} />}
        </div>
      </TimerContainer>
    </div>
  );
};

export default MinuteChanges;
