import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Heart, TrendingUp, Users, Calendar } from "lucide-react";

interface Project {
  id: number;
  student_name: string;
  project_title: string;
  description: string;
  funding_goal: number;
  current_funding: number;
  category: string;
  created_at: number;
  is_active: boolean;
}

interface ProjectCardProps {
  project: Project;
  onDonate: (projectId: number) => void;
}

const ProjectCard = ({ project, onDonate }: ProjectCardProps) => {
  const progress = (project.current_funding / project.funding_goal) * 100;
  const daysAgo = Math.floor((Date.now() - project.created_at) / (1000 * 60 * 60 * 24));

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50">
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold line-clamp-1">{project.project_title}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Users className="w-3 h-3" />
              {project.student_name}
            </p>
          </div>
          <Badge variant="secondary" className="shrink-0">
            {project.category}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-primary">
              {project.current_funding} AE raised
            </span>
            <span className="text-muted-foreground">
              Goal: {project.funding_goal} AE
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{Math.round(progress)}% funded</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {daysAgo} days ago
            </span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button 
            onClick={() => onDonate(project.id)} 
            className="flex-1 gap-2"
            disabled={!project.is_active}
          >
            <Heart className="w-4 h-4" />
            Donate Now
          </Button>
          <Button variant="outline" size="icon">
            <TrendingUp className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
