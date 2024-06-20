import React, { useState } from 'react';
import ChordStudy from './ChordStudy';
import MinuteChanges from './MinuteChanges';
import styled from 'styled-components';

const Container = styled.div`
    text-align: center;
`;

const App: React.FC = () => {
    const [exercise, setExercise] = useState<'chordStudy' | 'minuteChanges' | null>(null);

    return (
        <Container>
            <h1>Guitar Practice App</h1>
            {!exercise && (
                <div>
                    <button onClick={() => setExercise('chordStudy')}>Chord Study</button>
                    <button onClick={() => setExercise('minuteChanges')}>One Minute Changes</button>
                </div>
            )}
            {exercise == 'chordStudy' && <ChordStudy />}
            {exercise == 'minuteChanges' && <MinuteChanges />}
        </Container>
    );
};

export default App;