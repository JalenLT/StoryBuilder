import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { LucideIcon, Plus } from "lucide-react";

export const CreateNode: React.FC<{
    icon: React.ReactElement;
    title: string;
    onClick: () => void;
    backgroundColorBase: string;
    borderColorBase: string;
    backgroundColorHover: string;
    borderColorHover: string;
    textColor: string;
    iconColor: string;
}> = ({icon, title, onClick, backgroundColorBase, backgroundColorHover, borderColorBase, borderColorHover, textColor, iconColor}) => {
    return (
        <Card onClick={onClick} className={`${backgroundColorBase} border transition-colors ${borderColorBase} hoverable:${borderColorHover} hoverable:${backgroundColorHover}`}>
            <CardContent className="flex flex-col items-between p-2">
                <div className="flex items-center justify-between">
                    <Plus className={`${iconColor}`} />
                    <div className="flex items-center justify-center flex-1">
                        <div className={`flex ${textColor}`}>
                            {icon}
                            <span className="mx-auto">{title}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
