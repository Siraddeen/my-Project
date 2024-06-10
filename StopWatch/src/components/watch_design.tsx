import React from "react";

interface WatchDesignProps {
  milsec: number;
  seconds: number;
  minutes: number;
  hours: number;
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

export const WatchDesign: React.FC<WatchDesignProps> = ({
  milsec,
  seconds,
  minutes,
  hours,
  isRunning,
  start,
  stop,
  reset,
}) => {
  return (
    <div className="text-white bg-black font-poppins h-screen flex flex-col items-center justify-center">
      <div className="relative max-w-xs mx-auto mt-12 h-72 flex items-center justify-center">
        {/* Outer round layer with conditional class to change colours */}
        <div
          className={`w-72 h-72 border-4 rounded-full flex items-center justify-center ${
            isRunning ? "border-red-500" : "border-blue-500"
          }`}
        >
          {/* Timer to display time */}
          <div className="text-center">
            <span className="mr-2 text-4xl">
              {hours < 10 ? `0${hours}` : hours}
            </span>
            :
            <span className="mr-2 text-4xl">
              {minutes < 10 ? `0${minutes}` : minutes}
            </span>
            :
            <span className="mr-2 text-4xl">
              {seconds < 10 ? `0${seconds}` : seconds}
            </span>
            :
            <span className="text-2xl">
              {milsec < 10 ? `0${milsec}` : milsec}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-8 flex">
        <button
          className="bg-black text-white py-2 px-4 border border-gray-800 rounded-lg mr-4 text-lg hover:bg-gray-800"
          onClick={start}
        >
          Start
        </button>
        <button
          className="bg-black text-white py-2 px-4 border border-gray-800 rounded-lg mr-4 text-lg hover:bg-gray-800"
          onClick={stop}
        >
          Stop
        </button>
        <button
          className="bg-black text-white py-2 px-4 border border-gray-800 rounded-lg text-lg hover:bg-gray-800"
          onClick={reset}
        >
          Reset
        </button>
      </div>
      <br />
      <br />
      <div>
        <div className="bg-yellow-50 border-lime-300 italic bold ">hello</div>
        <div className="text-white bg-gray-800 p-8 rounded-lg shadow-lg max-w-md mx-auto mt-12">
          <h1 className="text-3xl font-bold mb-4">About Me</h1>
          <p className="text-lg leading-relaxed">
            Hello! My name is R Siradden, and I'm a self-taught learner . I have
            a passion for full_stack_Web-development, and I enjoy working on
            projects that involve problem solving. In my free time, I love to do
            projects like this. Any how this project built with React + Tailwind
            via TypeScript
          </p>
          <p className="text-lg leading-relaxed mt-4">
            Feel free to connect with me on{" "}
            <a
              href="https://www.linkedin.com/in/siraddeen/"
              className="text-blue-500 hover:underline"
            >
              LinkedIn
            </a>{" "}
            or check out my work on{" "}
            <a
              href="https://github.com/Siraddeen"
              className="text-blue-500 hover:underline"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
