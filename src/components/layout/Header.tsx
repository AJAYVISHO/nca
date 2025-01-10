import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Clock, 
  LogOut, 
  User, 
  Home, 
  BookOpen, 
  TestTube2, 
  Target, 
  GraduationCap, 
  Building2, 
  Landmark, 
  BookOpenCheck,
  UserCircle
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("UPSC-CSE");
  const isMobile = useIsMobile();

  const courses = [
    { id: 1, name: "UPSC-CSE", icon: GraduationCap },
    { id: 2, name: "TNPSC", icon: Building2 },
    { id: 3, name: "Banking", icon: Landmark },
    { id: 4, name: "Teaching", icon: BookOpenCheck },
  ];

  const menuItems = [
    { icon: Home, label: "Dashboard", value: "24h", href: "/dashboard" },
    { icon: BookOpen, label: "Study Hours", value: "24h", href: "/materials" },
    { icon: TestTube2, label: "Mock Tests", value: "8", href: "/mock-tests" },
    { icon: Target, label: "Progress", value: "65%", href: "/profile" },
  ];

  const selectedCourseData = courses.find(c => c.name === selectedCourse);
  const IconComponent = selectedCourseData?.icon;

  const MobileMenu = () => (
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetContent side="right" className="w-full p-0">
        <div className="flex flex-col h-full bg-background">
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">John Doe</h2>
                <p className="text-sm text-muted-foreground">john.doe@example.com</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto">
            <nav className="flex flex-col p-4 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="flex-1">{item.label}</span>
                  <span className="text-muted-foreground">{item.value}</span>
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="p-4 border-t">
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={() => {
                // Add logout logic here
                setMobileMenuOpen(false);
              }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-heading font-bold text-blue-600 hover:text-blue-700 transition-colors">
            Nanjil Career Academy
          </span>
        </Link>

        <div className="ml-4 flex-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="gap-2 bg-accent/5 hover:bg-accent/10"
              >
                {IconComponent && <IconComponent className="h-4 w-4" />}
                {selectedCourse}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px]">
              {courses.map((course) => (
                <DropdownMenuItem 
                  key={course.id}
                  className="gap-2 cursor-pointer"
                  onClick={() => setSelectedCourse(course.name)}
                >
                  <course.icon className="h-4 w-4" />
                  {course.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          {isMobile ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2">
                    <UserCircle className="w-4 h-4" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/enroll" className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    <span>Enroll in Courses</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {menuItems.map((item) => (
                  <DropdownMenuItem key={item.label} asChild>
                    <Link to={item.href} className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                      <span className="ml-auto text-muted-foreground">
                        {item.value}
                      </span>
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      <MobileMenu />
    </header>
  );
};
