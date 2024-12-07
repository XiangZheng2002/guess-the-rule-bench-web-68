import { ConversationSetup } from "@/components/ConversationSetup";
import { ConversationDisplay } from "@/components/ConversationDisplay";
import { useState } from "react";

interface Message {
  id: string;
  content: string;
  sender: string;
}

interface GameDetails {
  domain: string;
  difficulty: string;
  datasetType: string;
  startTime: Date;
  status: "ongoing" | "won" | "lost";
  turnsTaken: number;
}

const Play = () => {
  const [isConversationStarted, setIsConversationStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<string>("");
  const [isUserPlaying, setIsUserPlaying] = useState(false);
  const [gameDetails, setGameDetails] = useState<GameDetails>({
    domain: "",
    difficulty: "",
    datasetType: "",
    startTime: new Date(),
    status: "ongoing",
    turnsTaken: 0
  });

  const handleStart = (domain: string, difficulty: string, player: string, isDynamic: boolean) => {
    setIsConversationStarted(true);
    setCurrentPlayer(player);
    setIsUserPlaying(player === "user");
    setGameDetails({
      domain,
      difficulty,
      datasetType: isDynamic ? "Dynamic" : "Static",
      startTime: new Date(),
      status: "ongoing",
      turnsTaken: 0
    });
    
    setMessages([
      {
        id: Date.now().toString(),
        content: `Welcome to the Guess the Rule game! Domain: ${domain}, Difficulty: ${difficulty}`,
        sender: "system",
      },
    ]);
    
    if (player !== "user") {
      // Start AI gameplay simulation
      setIsLoading(true);
      // TODO: Implement AI gameplay logic
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const handleReset = () => {
    setIsConversationStarted(false);
    setMessages([]);
    setCurrentPlayer("");
    setIsUserPlaying(false);
    setGameDetails({
      domain: "",
      difficulty: "",
      datasetType: "",
      startTime: new Date(),
      status: "ongoing",
      turnsTaken: 0
    });
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Guess the Rule Game
        </h1>
        {!isConversationStarted ? (
          <ConversationSetup onStart={handleStart} />
        ) : (
          <ConversationDisplay
            messages={messages}
            isLoading={isLoading}
            onReset={handleReset}
            isUserPlaying={isUserPlaying}
            gameDetails={gameDetails}
          />
        )}
      </div>
    </div>
  );
};

export default Play;