interface HeaderProps {
  title?: string;
}

export function Header({ title = 'AI Assistant' }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 p-4">
      <h1 className="text-xl font-semibold text-white">{title}</h1>
    </header>
  );
}
