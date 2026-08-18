import { QuoteRoute } from "../../../app/route-clients";
import { contractors } from "../../../lib/demo";
export function generateStaticParams(){return contractors.map((c)=>({contractorId:c.id}));}
export default async function QuotePage({params}:{params:Promise<{contractorId:string}>}){const {contractorId}=await params;return <QuoteRoute contractorId={contractorId}/>;}

