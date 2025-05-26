import { icons, LucideProps } from "lucide-react";
import { createElement } from "react";

// Use Lucide's built-in icon names type
type IconName = keyof typeof icons;

interface IconProps extends Omit<LucideProps, "ref"> {
  name: IconName;
}

export default function Icon({ name, size = 24, color, className, ...props }: IconProps) {
  // Get the icon from the icons object

  const iconComponent = icons[name];

  if (!iconComponent) {
    console.warn(`Icon "${String(name)}" not found in Lucide React`);
    return createElement(icons["AlarmClock"], { size, color, className, ...props });
  }

  // Use createElement to render the icon
  return createElement(iconComponent, { size, color, className, ...props });
}

// Export the type for external use if needed
export type { IconName };
