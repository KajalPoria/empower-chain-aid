import { Card } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Target } from "lucide-react";

interface DashboardProps {
  stats: {
    totalProjects: number;
    totalDonated: number;
    totalDonations: number;
    activeProjects: number;
  };
}

const Dashboard = ({ stats }: DashboardProps) => {
  return (
    <section id="dashboard" className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Platform Impact</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time metrics showing the collective impact of our community
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground font-medium">Total Projects</p>
                <p className="text-3xl font-bold text-primary">{stats.totalProjects}</p>
                <p className="text-xs text-muted-foreground">{stats.activeProjects} active</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground font-medium">Total Donated</p>
                <p className="text-3xl font-bold text-secondary">{stats.totalDonated} AE</p>
                <p className="text-xs text-muted-foreground">≈ ${(stats.totalDonated * 0.3).toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground font-medium">Total Donations</p>
                <p className="text-3xl font-bold text-accent">{stats.totalDonations}</p>
                <p className="text-xs text-muted-foreground">From generous donors</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-accent" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground font-medium">Success Rate</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">98%</p>
                <p className="text-xs text-muted-foreground">Projects funded</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
