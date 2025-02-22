import { useEffect, useRef, useState } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

export default function Header() {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.loop = true;
      isMuted ? audioRef.current.pause() : audioRef.current.play();
    }
  }, [isMuted]);

  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <header className="relative flex justify-between gap-4 items-center">
      <a href="/" className="block ml-4 mt-4">
        <img
          src="/logo.png"
          alt="Game Logo"
          width={48}
          height={48}
          className="w-12 h-12"
        />
      </a>

      <audio ref={audioRef} src="/music.mp3" autoPlay loop />
      <button
        onClick={toggleMute}
        className="border-blue-300 border-4 absolute top-4 right-4 p-2 bg-gray-800 rounded-full text-white hover:bg-gray-600"
      >
        {isMuted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
      </button>
    </header>
  );
}
