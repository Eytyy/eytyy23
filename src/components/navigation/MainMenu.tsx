export default function MainMenu({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="flex gap-8 lg:gap-16">
      <div className="text-lg md:text-2xl">Work</div>
      <div className="text-lg md:text-2xl">Blog</div>
      <div className="text-lg md:text-2xl">Info</div>
      <div className="text-lg md:text-2xl">Contact</div>
    </div>
  );
}
