interface WelcomeMessageProps {
  title?: string;
  subtitle?: string;
}

export function WelcomeMessage({
  title = '👋 Hi there! I can help you find the best crypto prices.',
  subtitle = 'Start a conversation by typing a message below.'
}: WelcomeMessageProps) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center text-gray-500">
        <p className="text-lg mb-2">{title}</p>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}
