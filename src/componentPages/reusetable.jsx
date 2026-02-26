import { Button } from "@/components/ui/button";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineFeedback } from "react-icons/md";
function Reusetable({
    headertitle,
    children,
}) {
    return(
          <div className="p-3 min-h-screen capitalize">
      {/* Header */}
      <div className="flex  justify-between gap-2 p-2">
        <p className="text-2xl font-bold">{headertitle}</p>

        <div className="flex gap-2">
          <Button className="capitalize bg-white text-black hover:bg-amber-50 flex gap-1">
            <MdOutlineFeedback color="green" />
            feedback
          </Button>
          <Button className="capitalize bg-white text-black hover:bg-amber-50 flex gap-1">
            <IoDocumentTextOutline color="green" />
            documentation
          </Button>
        </div>
      </div>
      <div>
        {children}
      </div>
      </div>

    )
}
export default Reusetable;