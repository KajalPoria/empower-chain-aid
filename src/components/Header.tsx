import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

interface HeaderProps {
  walletAddress: string | null;
  onConnectWallet: () => void;
  onDisconnectWallet: () => void;
}

const Header = ({ walletAddress, onConnectWallet, onDisconnectWallet }: HeaderProps) => {
  return (
    <header className="border-b bg-card sticky top-0 z-50 backdrop-blur-sm bg-card/80">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-2xl">⛓️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                EmpowerChain
              </h1>
              <p className="text-xs text-muted-foreground">Blockchain-powered micro-grants</p>
            </div>
          </div>
          
          <nav className="flex items-center gap-6">
            <a href="#projects" className="text-sm font-medium hover:text-primary transition-colors">
              Projects
            </a>
            <a href="#dashboard" className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </a>
            
            {walletAddress ? (
              <div className="flex items-center gap-2">
                <div className="px-3 py-2 bg-primary/10 rounded-lg text-xs font-mono text-primary">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </div>
                <Button onClick={onDisconnectWallet} variant="outline" size="sm">
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button onClick={onConnectWallet} className="gap-2">
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
