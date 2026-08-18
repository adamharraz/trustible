import { ContractorProjectRoute } from "../../../route-clients";
export function generateStaticParams(){return [{id:"TRU-DEMO-2183"}];}
export default async function ContractorProjectPage({params}:{params:Promise<{id:string}>}){const {id}=await params;return <ContractorProjectRoute id={id}/>;}

