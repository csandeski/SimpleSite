export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="text-center space-y-8 max-w-md mx-auto">
        <div className="greeting-text cursor-default select-none">
          <h1 
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-foreground tracking-tight transition-all duration-300 ease-in-out hover:-translate-y-0.5"
            data-testid="greeting-text"
          >
            oi
          </h1>
        </div>
        
        <div className="w-12 h-0.5 bg-muted-foreground/30 mx-auto opacity-60"></div>
      </div>
    </main>
  );
}
