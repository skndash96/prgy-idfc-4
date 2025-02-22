export default function Header() {
  return (
    <header className="flex justify-between gap-4 items-center">
      <a href="/" className="block ml-4 mt-4">
        <img
          src="/logo.png"
          alt="Game Logo"
          width={48}
          height={48}
          className="w-12 h-12"
        />
      </a>
    </header>
  );
}
