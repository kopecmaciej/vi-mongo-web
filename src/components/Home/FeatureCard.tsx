import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }}
    transition={{ duration: 0.5 }}
    className="h-full"
  >
    <Card className="bg-[#112419] border-[#1a3626] h-full flex flex-col">
      <CardContent className="p-6 flex flex-col flex-grow">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-[#1a3626] p-2 rounded-lg">{icon}</div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <p className="text-gray-300 flex-grow">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

