import {
  FcFolder,
  FcProcess,
  FcBarChart,
  FcLineChart,
  FcDocument,
  FcFile,
  FcBusinessman,
  FcDiploma2,
} from "react-icons/fc";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";
function Reusesidebar({children}) {
    const sidebarItems = [
        { icon: <FcBarChart />, label: "Dashboard" },
        { icon: <FcProcess />, label: "Lifecycle" },
        { icon: <FcLineChart />, label: "Analytics" },
        { icon: <FcFolder />, label: "Projects" },
        { icon: <FcBusinessman />, label: "Team" },
      ];
    
      const documentItems = [
        { icon: <FcDiploma2 />, label: "Data Library" },
        { icon: <FcDocument />, label: "Reports" },
        { icon: <FcFile />, label: "Word Assistant" },
        { icon: "⋯", label: "More" },
      ];
    return(
<SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <Sidebar className="border-r bg-white">
          <SidebarHeader className="border-b px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-center">Acme Inc.</span>
            </div>
          </SidebarHeader>

          <SidebarContent className="px-3 py-4">
            <SidebarGroup>
              <p className="mb-2 px-3 text-xs font-medium text-gray-500">
                Home
              </p>
              <div className="flex flex-col gap-1">
                {sidebarItems.map((item, i) => (
                  <button
                    key={i}
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </SidebarGroup>
            <SidebarGroup className="mt-6">
              <p className="mb-2 px-3 text-xs font-medium text-gray-500">
                Documents
              </p>
              <div className="flex flex-col gap-1">
                {documentItems.map((item, i) => (
                  <button
                    key={i}
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </SidebarGroup>{" "}
          </SidebarContent>
        </Sidebar>
        <div className="w-full">
            {children}
        </div>
        </div>
        </SidebarProvider>
    )
}
export default Reusesidebar