import React, { useEffect, useState } from "react";
import * as Tone from "tone";

interface AudioFile {
  file: File;
  id: string;
  url: string;
}

interface MultiAudioPlayerProps {
  audioFiles: AudioFile[];
}

const MultiAudioPlayer: React.FC<MultiAudioPlayerProps> = ({ audioFiles }) => {
  const [players, setPlayers] = useState<Record<string, Tone.Player>>({});

  useEffect(() => {
    const newPlayers: Record<string, Tone.Player> = {};

    audioFiles.forEach((file, index) => {
      const player = new Tone.Player(file.url).toDestination();
      newPlayers[`player${index}`] = player;
    });

    setPlayers(newPlayers);

    // Cleanup on unmount
    return () => {
      Object.values(newPlayers).forEach((player) => player.dispose());
    };
  }, [audioFiles]);

  const handlePlay = () => {
    Tone.start();
    Object.values(players).forEach((player) => player.start());
  };

  const handleStop = () => {
    Object.values(players).forEach((player) => player.stop());
  };

  return (
    <div>
      <button onClick={handlePlay}>Play</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
};

export default MultiAudioPlayer;
