import { ProfileRoute } from "../../../app/route-clients";
import { contractors } from "../../../lib/demo";
export function generateStaticParams(){return contractors.map((c)=>({id:c.id}));}
export default async function ProfilePage({params}:{params:Promise<{id:string}>}){const {id}=await params;return <ProfileRoute id={id}/>;}

