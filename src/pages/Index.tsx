import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import Dashboard from "@/components/Dashboard";
import DonationDialog from "@/components/DonationDialog";
import CreateProjectDialog from "@/components/CreateProjectDialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

// Mock data for demonstration
const mockProjects = [
  {
    id: 1,
    student_name: "Sarah Johnson",
    project_title: "Assistive Reading Technology for Visual Impairment",
    description: "Need funding for specialized screen reading software and braille display to complete my Computer Science degree. This technology will enable me to code independently and pursue my dream career.",
    funding_goal: 50,
    current_funding: 35,
    category: "Technology",
    created_at: Date.now() - 5 * 24 * 60 * 60 * 1000,
    is_active: true,
  },
  {
    id: 2,
    student_name: "Michael Chen",
    project_title: "Wheelchair-Accessible Lab Equipment",
    description: "Seeking support to purchase height-adjustable lab equipment for my Chemistry major. This will allow me to independently conduct experiments and research.",
    funding_goal: 75,
    current_funding: 60,
    category: "Equipment",
    created_at: Date.now() - 12 * 24 * 60 * 60 * 1000,
    is_active: true,
  },
  {
    id: 3,
    student_name: "Emily Rodriguez",
    project_title: "Speech-to-Text Software for Lectures",
    description: "Looking for funding to get professional transcription software for my lectures. This will help me keep up with fast-paced discussions in my Law program.",
    funding_goal: 30,
    current_funding: 28,
    category: "Education",
    created_at: Date.now() - 3 * 24 * 60 * 60 * 1000,
    is_active: true,
  },
  {
    id: 4,
    student_name: "David Kim",
    project_title: "Specialized Keyboard and Mouse Setup",
    description: "Need adaptive input devices for my Engineering studies. These tools will help me design and create without limitations.",
    funding_goal: 40,
    current_funding: 15,
    category: "Technology",
    created_at: Date.now() - 7 * 24 * 60 * 60 * 1000,
    is_active: true,
  },
];

const Index = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [projects, setProjects] = useState(mockProjects);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [showDonationDialog, setShowDonationDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState<number | null>(null);

  const stats = {
    totalProjects: projects.length,
    totalDonated: projects.reduce((sum, p) => sum + p.current_funding, 0),
    totalDonations: 127,
    activeProjects: projects.filter(p => p.is_active).length,
  };

  const handleConnectWallet = async () => {
    try {
      // Simulated wallet connection
      const mockAddress = "ak_" + Math.random().toString(36).substring(2, 15);
      setWalletAddress(mockAddress);
      toast.success("Wallet connected successfully!", {
        description: "You can now interact with the platform",
      });
    } catch (error) {
      toast.error("Failed to connect wallet", {
        description: "Please make sure Superhero Wallet is installed",
      });
    }
  };

  const handleDisconnectWallet = () => {
    setWalletAddress(null);
    toast.info("Wallet disconnected");
  };

  const handleDonate = (projectId: number) => {
    if (!walletAddress) {
      toast.error("Please connect your wallet first");
      return;
    }
    setSelectedProject(projectId);
    setShowDonationDialog(true);
  };

  const processDonation = (amount: number, message: string) => {
    if (!selectedProject) return;
    
    // Update project funding
    setProjects(projects.map(p => 
      p.id === selectedProject 
        ? { ...p, current_funding: p.current_funding + amount }
        : p
    ));

    toast.success("Donation successful!", {
      description: `You donated ${amount} AE. Transaction recorded on blockchain.`,
    });
  };

  const handleCreateProject = (projectData: any) => {
    if (!walletAddress) {
      toast.error("Please connect your wallet first");
      return;
    }

    const newProject = {
      id: projects.length + 1,
      student_name: projectData.studentName,
      project_title: projectData.projectTitle,
      description: projectData.description,
      funding_goal: projectData.fundingGoal,
      current_funding: 0,
      category: projectData.category,
      created_at: Date.now(),
      is_active: true,
    };

    setProjects([newProject, ...projects]);
    toast.success("Project created successfully!", {
      description: "Your project is now live and accepting donations",
    });
  };

  const handleDeleteProject = (projectId: number) => {
    setDeleteProjectId(projectId);
  };

  const confirmDelete = () => {
    if (!deleteProjectId) return;
    
    setProjects(projects.filter(p => p.id !== deleteProjectId));
    toast.success("Project deleted successfully");
    setDeleteProjectId(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        walletAddress={walletAddress}
        onConnectWallet={handleConnectWallet}
        onDisconnectWallet={handleDisconnectWallet}
      />
      
      <Hero onSubmitProject={() => setShowCreateDialog(true)} />
      
      <Dashboard stats={stats} />
      
      <section id="projects" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold mb-2">Active Projects</h2>
              <p className="text-muted-foreground">
                Support students and track their progress transparently
              </p>
            </div>
            <Button onClick={() => setShowCreateDialog(true)} className="gap-2">
              <PlusCircle className="w-4 h-4" />
              Submit Project
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onDonate={handleDonate}
                onDelete={handleDeleteProject}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-4xl font-bold">About EmpowerChain</h2>
          <p className="text-lg text-muted-foreground">
            EmpowerChain is a decentralized micro-grant platform built on Aeternity blockchain, 
            designed to connect specially-abled students with donors worldwide. Every donation 
            is transparent, traceable, and recorded on the blockchain for complete accountability.
          </p>
          <div className="grid md:grid-cols-3 gap-6 pt-8">
            <div className="space-y-2">
              <div className="text-4xl mb-2">🔒</div>
              <h3 className="font-semibold">Transparent</h3>
              <p className="text-sm text-muted-foreground">
                All transactions recorded on blockchain
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl mb-2">⚡</div>
              <h3 className="font-semibold">Fast & Efficient</h3>
              <p className="text-sm text-muted-foreground">
                Instant donations with low fees
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl mb-2">🎯</div>
              <h3 className="font-semibold">Impact-Driven</h3>
              <p className="text-sm text-muted-foreground">
                Track milestones and real outcomes
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t py-8 px-4 bg-card">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 EmpowerChain. Built on Aeternity Blockchain.</p>
          <p className="mt-2">Empowering dreams through transparent donations.</p>
        </div>
      </footer>

      <DonationDialog
        open={showDonationDialog}
        onClose={() => setShowDonationDialog(false)}
        projectTitle={projects.find(p => p.id === selectedProject)?.project_title || ""}
        onDonate={processDonation}
      />

      <CreateProjectDialog
        open={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        onCreate={handleCreateProject}
      />

      <AlertDialog open={!!deleteProjectId} onOpenChange={() => setDeleteProjectId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this project? This action cannot be undone and all associated data will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
