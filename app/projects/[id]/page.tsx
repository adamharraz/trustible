import { ProjectRoute } from "../../../app/route-clients";
export function generateStaticParams(){return [{id:"TRU-DEMO-2183"}];}
export default async function ProjectPage({params}:{params:Promise<{id:string}>}){const {id}=await params;return <ProjectRoute id={id}/>;}

