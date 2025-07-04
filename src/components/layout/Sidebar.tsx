
import { Link, useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Home, ChartArea, Gauge, PanelLeftClose, PanelLeft, CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  // Use the location object to get the current path
  const location = useLocation();
  const currentPath = location.pathname;
  const {
    state
  } = useSidebar();
  return <>
      <Sidebar variant="sidebar" collapsible="icon">
        <div className="flex justify-end p-3">
          <SidebarTrigger className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
            {state === "expanded" ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeft className="h-5 w-5" />}
          </SidebarTrigger>
        </div>
        <SidebarContent className="pt-2">
          <SidebarGroup>
            <SidebarGroupContent>
              <div className="px-2">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={currentPath === '/'} tooltip="Risk Overview" className={cn("transition-colors", currentPath === "/" && "bg-blue-50 text-blue-800")}>
                      <Link to="/">
                        <ChartArea className="h-5 w-5" />
                        <span>Risk Overview</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={currentPath === '/riskregister'} tooltip="Risk Register" className={cn("transition-colors", currentPath === "/riskregister" && "bg-blue-50 text-blue-800")}>
                      <Link to="/riskregister">
                        <Home className="h-5 w-5" />
                        <span>Risk Register</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={currentPath === '/metrics'} tooltip="Metrics" className={cn("transition-colors", currentPath === "/metrics" && "bg-blue-50 text-blue-800")}>
                      <Link to="/metrics">
                        <Gauge className="h-5 w-5" />
                        <span>Metrics</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={currentPath === '/actiontracker'} tooltip="Action Tracker" className={cn("transition-colors", currentPath === "/actiontracker" && "bg-blue-50 text-blue-800")}>
                      <Link to="/actiontracker">
                        <CheckSquare className="h-5 w-5" />
                        <span>Action Tracker</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>;
}
