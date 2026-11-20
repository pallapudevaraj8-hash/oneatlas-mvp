import { PageHeading } from "@/components/page-heading";
import DemoNotice from "@/components/demo-notice";
import CompareTool from "@/components/compare-tool";
export default async function ComparePage({searchParams}:{searchParams:Promise<{ids?:string}>}){
  const params=await searchParams;
  const initialIds=[...new Set((params.ids??"").split(",").filter(id=>/^[a-z0-9-]{1,80}$/.test(id)))].slice(0,4);
  return <div className="shell pt-12 pb-12"><PageHeading eyebrow="Side-by-side analysis" title="Compare AI models" description="Explore specifications, pricing, capabilities and demo benchmark scores for up to four models."/><div className="mb-6"><DemoNotice/></div><CompareTool initialIds={initialIds}/></div>;
}
